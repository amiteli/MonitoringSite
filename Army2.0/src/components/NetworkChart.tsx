import { Chip } from "@mui/material";
import React, { useState } from "react";
import { useQuery } from "react-query";
import StackedBarChart from "./StackedBarChart";
// import StackedBarChart from "./StackedBarChart";

type IProps = {
  selectedUnit: string;
};
type dataParam = {
  id: number;
  status: string;
  number: number;
};
type BarDataParam = {
  id: number;
  network: string;
  OK: number;
  ERROR: number;
  FAILED: number;
};
type arrayOfDataParam = {
  RCGWChartData: Array<dataParam>;
  MakmashimChartData: Array<dataParam>;
  NetworkChartData: Array<BarDataParam>;
};
type RcgwDataObject = {
  // dataStateArray: Array<string>;
  labelArray: Array<string>;
  selectedArray: Array<string>;
  okNumberArray: Array<number>;
  failedNumberArray: Array<number>;
  errorNumberArray: Array<number>;
  chartTitle: string;
};
type DeletedChartData = {
  ok: number;
  failed: number;
  error: number;
};
type DeletedChartDataObj = {
  [label: string]: DeletedChartData;
};
// type DictOfDeletedChartData = {
//   label: DeletedChartData
// }

const NetWorkChart = (props: IProps) => {
  const { selectedUnit } = props;
  const [errorText, setErrorText] = useState(" ");
  const [deletedData, setDeletedData] = useState<DeletedChartDataObj>({});
  const [BarDataArrays, setBarDataStateArray] = useState<RcgwDataObject>({
    labelArray: [],
    selectedArray: [],
    // dataStateArray: [],
    okNumberArray: [],
    failedNumberArray: [],
    errorNumberArray: [],
    chartTitle: " ",
  });

  const fetchChartsData = async (): Promise<arrayOfDataParam> => {
    const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/charts/rcgw-chart-data/${selectedUnit}`,
    );
    if (!res.ok) {
      console.log("error at fetching rcgw-chart-data");
      setErrorText(
        `status code: ${res.status} status text: ${res.statusText} url: ${res.url}`
      );
      throw new Error("Problem fetching data");
    }
    return res.json();
  };

  const { data, isLoading, isError } = useQuery<arrayOfDataParam>(
    "BarChartData",
    fetchChartsData,
    {
      onSuccess: (data) => {
        const allData: any = data?.NetworkChartData.map(
          (machine: BarDataParam) => {
            if (data) {
              return [
                machine.network,
                machine.OK,
                machine.FAILED,
                machine.ERROR,
              ];
            } else return [" ", 0, 0, 0];
          }
        );

        const statesArray = allData.map((element: any) => {
          return element[0];
        });
        const okNumbersArray = allData.map((element: any) => {
          return element[1];
        });
        const failedNumbersArray = allData.map((element: any) => {
          return element[2];
        });
        const errorNumbersArray = allData.map((element: any) => {
          return element[3];
        });

        setBarDataStateArray((prevState) => {
          let labelArray: any = [],
            selectedArray: any = [],
            okNumberArray: any = [],
            failedNumberArray: any = [],
            errorNumberArray: any = [];

          for (let state of statesArray) {
            //running on the labels of the char
            let index = statesArray.indexOf(state);
            if (prevState.labelArray.find((label) => label === state)) {
              let i = prevState.labelArray.indexOf(state);

              labelArray.push(state);
              okNumberArray.push(prevState.okNumberArray[i]);

              failedNumberArray.push(prevState.failedNumberArray[i]);
              errorNumberArray.push(prevState.errorNumberArray[i]);
            } else if (
              prevState.selectedArray.find((label) => label === state)
            ) {
              // let i = prevState.selectedArray.indexOf(state);
              selectedArray.push(state);
            } else {
              labelArray.push(state);
              okNumberArray.push(okNumbersArray[index]);
              failedNumberArray.push(failedNumbersArray[index]);
              errorNumberArray.push(errorNumbersArray[index]);
              // console.log("gere");
            }
          }
          return {
            labelArray: labelArray,
            selectedArray: selectedArray,
            okNumberArray: okNumberArray,
            failedNumberArray: failedNumberArray,
            errorNumberArray: errorNumberArray,
            chartTitle: `רשתות מול מקמ"שים`,
          };
        });
      },
    }
  );

  const {
    labelArray,
    selectedArray,
    okNumberArray,
    failedNumberArray,
    errorNumberArray,
    chartTitle,
  } = BarDataArrays;

  const clickOnLabelArray = (label: string) => {
    let index = BarDataArrays.labelArray.indexOf(label);
    const deletedLabel = BarDataArrays.labelArray.splice(index, 1);
    const deletedOk = BarDataArrays.okNumberArray.splice(index, 1);
    const deletedFailed = BarDataArrays.failedNumberArray.splice(index, 1);
    const deletedError = BarDataArrays.errorNumberArray.splice(index, 1);

    let labelTemp = deletedLabel[0];
    let okTemp = deletedOk[0];
    let failedTemp = deletedFailed[0];
    let deleteTemp = deletedError[0];

    // i know i could wrote it without the above but for easy understanding i decided to write it like that
    let selectedLabel = {
      [labelTemp]: {
        ok: okTemp,
        failed: failedTemp,
        error: deleteTemp,
      },
    };
    let dictOfSelected = Object.assign(deletedData, selectedLabel);
    setDeletedData(dictOfSelected);
    setBarDataStateArray({
      labelArray: BarDataArrays.labelArray,
      selectedArray: [label, ...BarDataArrays.selectedArray],
      okNumberArray: BarDataArrays.okNumberArray,
      failedNumberArray: BarDataArrays.failedNumberArray,
      errorNumberArray: BarDataArrays.errorNumberArray,
      chartTitle: `רשתות מול מקמ"שים`,
    });
  };

  const clickOnSelectedArray = (label: string) => {
    const ok = deletedData[label].ok;
    const failed = deletedData[label].failed;
    const error = deletedData[label].error;

    const newDeletedObj = Object.keys(deletedData)
      .filter((key) => key !== label)
      .reduce((result:any, current:any) => {
        result[current] = deletedData[current];
        return result;
      }, {});
    // console.log(newDeletedObj);
    setDeletedData(newDeletedObj);
    // console.log(newDeletedObj);

    setBarDataStateArray({
      labelArray: [label, ...BarDataArrays.labelArray],
      selectedArray: BarDataArrays.selectedArray.filter(
        (labelInArray) => labelInArray !== label
      ),
      okNumberArray: [ok, ...BarDataArrays.okNumberArray],
      failedNumberArray: [failed, ...BarDataArrays.failedNumberArray],
      errorNumberArray: [error, ...BarDataArrays.errorNumberArray],
      chartTitle: `רשתות מול מקמ"שים`,
    });
    // TODO ---- connect the Chips to CHARTBAR
  };

  if (isLoading) return <>"Loading..."</>;

  if (isError) return <>"An error has occurred: " {errorText}</>;

  return (
    <>
      {labelArray &&
        labelArray.map((data, index) => {
          return (
            <Chip
              key={index}
              label={data}
              color="secondary"
              // variant="outlined"
              sx={{ margin: "3px" }}
              clickable
              onClick={() => clickOnLabelArray(data)}
            />
          );
        })}
      {selectedArray &&
        selectedArray.map((data, index) => {
          return (
            <Chip
              key={index}
              label={data}
              color="error"
              sx={{ margin: "3px" }}
              clickable
              onClick={() => clickOnSelectedArray(data)}
            />
          );
        })}
      <StackedBarChart
        labels={labelArray}
        dataOK={okNumberArray}
        dataFAILED={failedNumberArray}
        dataERROR={errorNumberArray}
        chartTitle={chartTitle}
      />
    </>
  );
};

export default NetWorkChart;
