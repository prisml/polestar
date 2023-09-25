const fetch = require("node-fetch");
const notifier = require("node-notifier");
// const readline = require("readline");

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// async function waitForInput() {
//   rl.question("아무 키나 누르면 프로그램을 종료합니다...", () => {
//     rl.close();
//     process.exit(0);
//   });
// }

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function wait30Seconds() {
  await wait(30000); // 60초 동안 대기
}

async function readStream() {
  try {
    const response = await fetch(
      "https://pc-api.polestar.com/eu-north-1/preconfigured-cars/",
      {
        headers: {
          accept: "*/*",
          "accept-language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
          "content-type": "application/json",
          "sec-ch-ua":
            '"Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site",
        },
        referrer: "https://www.polestar.com/",
        referrerPolicy: "strict-origin-when-cross-origin",
        body: '{"operationName":"LoadResultsQuery","variables":{"market":"kr","includeValidFilters":true,"sort":{"attribute":"DeliveryDate","direction":"Asc"},"debug":false,"filters":[{"filterTypeId":"4","filterValues":[{"value":"534","featureCode":"534","isB2B":false}]},{"filterTypeId":"9","filterValues":[{"value":"LRSM","featureCode":"LRSM","isB2B":false}]}],"pagination":{"pageSize":20,"pageNo":1}},"query":"query LoadResultsQuery($market: String!, $includeValidFilters: Boolean!, $filters: [FilterValueGroupInput], $pagination: PaginationInput, $partnerId: String, $sort: FilterSortInput, $debug: Boolean!, $stateCode: String, $customerType: String) {\\n  filterFunction(\\n    market: $market\\n    includeValidFilters: $includeValidFilters\\n    filters: $filters\\n    pagination: $pagination\\n    partnerId: $partnerId\\n    sort: $sort\\n    debug: $debug\\n    stateCode: $stateCode\\n    customerType: $customerType\\n  ) {\\n    debugInfo\\n    b2b\\n    timestamp\\n    market\\n    pagination {\\n      pageSize\\n      pageNo\\n      totalRecords\\n    }\\n    validFilters {\\n      filterTypeId\\n      featureType\\n      filterValues {\\n        value\\n        featureCode\\n        isB2B\\n        thumbnailUrl\\n        mutexGroupCode\\n      }\\n      filterRanges {\\n        upper\\n        lower\\n        featureCode\\n        isB2B\\n      }\\n    }\\n    filterResults {\\n      pno34\\n      modelYear\\n      startStructureWeek\\n      earliestDeliveryDate\\n      cashPriceData {\\n        discounted {\\n          car {\\n            type\\n            code\\n            price\\n            vat\\n            priceIncVat\\n          }\\n          totals {\\n            car {\\n              carTotalPrice {\\n                id\\n                label\\n                value\\n              }\\n              carTotalPriceExclVAT {\\n                id\\n                label\\n                value\\n              }\\n            }\\n            grandTotal {\\n              paymentTotal {\\n                paymentTotalBasicPrice {\\n                  id\\n                  label\\n                  value\\n                }\\n                paymentTotalPrice {\\n                  id\\n                  label\\n                  value\\n                }\\n              }\\n            }\\n          }\\n        }\\n        listPrice {\\n          totals {\\n            car {\\n              carTotalPrice {\\n                id\\n                label\\n                value\\n              }\\n              carTotalPriceExclVAT {\\n                id\\n                label\\n                value\\n              }\\n            }\\n            grandTotal {\\n              paymentTotal {\\n                paymentTotalBasicPrice {\\n                  id\\n                  label\\n                  value\\n                }\\n                paymentTotalPrice {\\n                  id\\n                  label\\n                  value\\n                }\\n              }\\n            }\\n          }\\n        }\\n      }\\n      images {\\n        icons {\\n          rims\\n          color\\n          upholstery\\n        }\\n        location {\\n          url\\n          angles\\n          resolutions\\n        }\\n        studio {\\n          url\\n          angles\\n          resolutions\\n        }\\n      }\\n      content {\\n        excluded\\n        filterTypeId\\n        featureType\\n        code\\n        name\\n        description\\n        numericValue\\n        dateValue\\n        stringValue\\n        images {\\n          url\\n          alt\\n        }\\n        thumbnail {\\n          url\\n          alt\\n        }\\n        isB2B\\n      }\\n      towbar {\\n        excluded\\n        filterTypeId\\n        featureType\\n        code\\n        name\\n        cardTitle\\n        labelForInfo\\n      }\\n      wltpNedcSummary {\\n        items {\\n          name\\n          description\\n          value\\n          unit\\n        }\\n      }\\n      techData {\\n        engineBev_LabelForPower\\n        engineBev_TotalHp\\n        engineBev_TotalKw\\n        engineBev_LabelForTorque\\n        labelForPerformanceRange\\n        performance\\n        engineBev_ElectricRange\\n        engineBev_LabelForElectricMotors\\n        engineBev_ElectricMotors\\n        engineBev_ElectricRangeEpaMiles\\n        labelForDivider\\n        driveTrain\\n        drive\\n      }\\n      packages {\\n        filterTypeId\\n        featureType\\n        name\\n        code\\n        cardTitle\\n        images {\\n          url\\n          alt\\n        }\\n        thumbnail {\\n          url\\n          alt\\n        }\\n      }\\n      isCampaignEnabled\\n    }\\n    filters {\\n      filterTypeId\\n      featureType\\n      filterValues {\\n        value\\n        featureCode\\n        isB2B\\n      }\\n      filterRanges {\\n        upper\\n        lower\\n        featureCode\\n        isB2B\\n      }\\n    }\\n    campaigns {\\n      description\\n      discountCode\\n      discountImageUrl\\n      discountType\\n      title\\n      url\\n      validTo\\n    }\\n  }\\n}\\n"}',
        method: "POST",
        mode: "cors",
        credentials: "include",
      }
    );

    const text = await response.text();
    return text;
  } catch (error) {
    console.error("오류:", error);
    throw error;
  }
}

function showNotification() {
  notifier.notify({
    title: "이봐라이봐라",
    message: "떴다!!!",
    icon: "./polestar.ico", // 알림 아이콘 이미지 경로
  });
}

async function alertWindow() {
  try {
    while (true) {
      const data = await readStream();
      const jsonData = JSON.parse(data);

      // 필요한 작업 수행
      const cars = jsonData.data.filterFunction.filterResults;
      const blackCars = cars.filter(
        (car) =>
          car.content[0].name === "Space" &&
          new Date(car.earliestDeliveryDate) >
            new Date("2023-11-10T00:00:00.000Z")
      );

      console.log(cars.map((car) => car.content[0].name));
      console.log(
        "11월 이후 출고",
        cars
          .filter(
            (car) =>
              new Date(car.earliestDeliveryDate) >
              new Date("2023-11-10T00:00:00.000Z")
          )
          .map(({ content }) => content[0].name)
      );
      if (blackCars.length) {
        showNotification();
      }
      await wait30Seconds();
    }
  } catch (error) {
    console.error("오류:", error);
  }
}

alertWindow();
