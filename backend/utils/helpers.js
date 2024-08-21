exports.roundToTwoDecimals = (num) => {
    return Math.round((num + Number.EPSILON) * 100) / 100;
  };
  
  exports.getTotalSalesPipeline = (interval) => {
    const groupBy = getGroupByDate(interval);
    return [
      {
        $group: {
          _id: groupBy,
          totalSales: { $sum: { $toDouble: "$total_price" } }
        }
      },
      {
        $project: {
          _id: 0,
          period: "$_id",
          totalSales: 1
        }
      },
      { $sort: { "period": 1 } }
    ];
  };
  
  exports.getSalesGrowthRatePipeline = (interval) => {
    const groupBy = getGroupByDate(interval);
    return [
      {
        $group: {
          _id: groupBy,
          totalSales: { $sum: { $toDouble: "$total_price" } }
        }
      },
      { $sort: { "_id": 1 } },
      {
        $group: {
          _id: null,
          sales: { $push: { period: "$_id", sales: "$totalSales" } }
        }
      },
      {
        $project: {
          _id: 0,
          growthRates: {
            $map: {
              input: { $range: [1, { $size: "$sales" }] },
              as: "i",
              in: {
                period: { $arrayElemAt: ["$sales.period", "$$i"] },
                growthRate: {
                  $multiply: [
                    {
                      $subtract: [
                        { $divide: [{ $arrayElemAt: ["$sales.sales", "$$i"] }, { $arrayElemAt: ["$sales.sales", { $subtract: ["$$i", 1] }] }] },
                        1
                      ]
                    },
                    100
                  ]
                }
              }
            }
          }
        }
      }
    ];
  };
  
  exports.getNewCustomersPipeline = (interval) => {
    const groupBy = getGroupByDate(interval);
    return [
      {
        $group: {
          _id: groupBy,
          newCustomers: { $sum: 1 }
        }
      },
      { $sort: { "_id": 1 } }
    ];
  };
  
  exports.getRepeatCustomersPipeline = (interval) => {
    const groupBy = getGroupByDate(interval);
    return [
      {
        $group: {
          _id: {
            customer: "$customer.id",
            period: groupBy
          },
          orderCount: { $sum: 1 }
        }
      },
      {
        $match: { orderCount: { $gt: 1 } }
      },
      {
        $group: {
          _id: "$_id.period",
          repeatCustomers: { $sum: 1 }
        }
      },
      { $sort: { "_id": 1 } }
    ];
  };
  
  exports.getCustomerGeographyPipeline = () => {
    return [
      {
        $group: {
          _id: "$default_address.city",
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 20 }
    ];
  };
  
  exports.getCustomerLifetimeValuePipeline = () => {
    return [
      {
        $group: {
          _id: {
            customer: "$customer.id",
            cohort: { $substr: ["$created_at", 0, 7] }
          },
          totalSpent: { $sum: { $toDouble: "$total_price" } }
        }
      },
      {
        $group: {
          _id: "$_id.cohort",
          averageLifetimeValue: { $avg: "$totalSpent" }
        }
      },
      { $sort: { "_id": 1 } }
    ];
  };
  
  function getGroupByDate(interval) {
    switch (interval) {
      case 'daily':
        return { $dateToString: { format: "%Y-%m-%d", date: { $toDate: "$created_at" } } };
      case 'monthly':
        return { $dateToString: { format: "%Y-%m", date: { $toDate: "$created_at" } } };
      case 'quarterly':
        return {
          $concat: [
            { $toString: { $year: { $toDate: "$created_at" } } },
            "Q",
            { $toString: { $ceil: { $divide: [{ $month: { $toDate: "$created_at" } }, 3] } } }
          ]
        };
      case 'yearly':
      default:
        return { $dateToString: { format: "%Y", date: { $toDate: "$created_at" } } };
    }
  }