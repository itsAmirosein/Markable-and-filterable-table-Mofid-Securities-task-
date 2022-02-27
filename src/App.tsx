import React, { useMemo, useState } from "react";
import "./App.css";
import DataList from "./Components/DataList/dataList";
import Dictionary from "./DictionaryFile/Dictionary.json";
import { DataListType, HeadType } from "./Types/dataTypes";
import { BiChevronUp, BiChevronDown } from "react-icons/bi";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

const { DataCells } = Dictionary.Table;

function App() {
  const [sort, setSort] = useState<boolean>(false);
  const [isStar, setIsStart] = useState<boolean>(false);
  const [markedRecords, setMarkedRecords] = useState<any>({ ...localStorage });

  const headCells: HeadType[] = [
    {
      id: "new_value",
      title: DataCells["New-Value"],
    },
    {
      id: "old_value",
      title: DataCells["Old-Value"],
    },
    {
      id: "field",
      title: DataCells["Field"],
    },
    {
      id: "title",
      title: DataCells["AdvertisingTitle"],
    },
    {
      id: "date",
      title: DataCells["Date"],
      sort: {
        handleSort: handleSort,
        sortComponent: sort ? (
          <>
            <BiChevronUp />{" "}
          </>
        ) : (
          <>
            <BiChevronDown />{" "}
          </>
        ),
      },
    },
    {
      id: "name",
      title: DataCells["EditoreName"],
      sort: {
        handleSort: handleSort,
        sortComponent: sort ? (
          <>
            <BiChevronUp />{" "}
          </>
        ) : (
          <>
            <BiChevronDown />{" "}
          </>
        ),
      },
    },
    {
      id: "",
      title: DataCells["Mark"],
      columnComponent: {
        component: (
          <div className="starIcon">
            {isStar ? <AiFillStar /> : <AiOutlineStar />}
          </div>
        ),
        onClick: handleOnStartClick,
      },
    },
  ];
  const [listData, setListData] = useState<DataListType>({
    data: [
      {
        id: 1,
        name: "Mohammad Esmaeili",
        date: "2018-03-20",
        title: "چاپ پوستر های با کیفیت دیواری به ابعاد دلخواه",
        field: "عنوان",
        old_value: 12314,
        new_value: 123,
      },
      {
        id: 2,
        name: "Ali Zamani",
        date: "2018-09-18",
        title: "ایفون 6s plus",
        field: "قیمت",
        old_value: 902385,
        new_value: 1506113,
      },
      {
        id: 26,
        name: "BAfshin Ahmadi",
        date: "2019-07-29",
        title: "کاپشن مردانه",
        field: "قیمت",
        old_value: 846688,
        new_value: 4677622,
      },
    ],
  });

  function handleSort(id: string) {
    const copyListData = { ...listData };
    const copyData = [...listData.data];
    copyData.sort((a: { [unit: string]: any }, b: { [unit: string]: any }) => {
      if (a[id] > b[id]) {
        return sort ? 1 : -1;
      } else if (a[id] === b[id]) {
        return 0;
      } else {
        return sort ? -1 : 1;
      }
    });
    copyListData.data = copyData;
    setListData(copyListData);
    setSort(!sort);
  }

  function handleOnStartClick(id: any) {
    const item = localStorage.getItem(id.toString());
    console.log(item, "id");
    if (item) {
      localStorage.removeItem(id.toString());
      const copyMarkedRecords = { ...markedRecords };
      delete copyMarkedRecords[id.toString()];
      console.log(markedRecords, "mainMarked");
      setMarkedRecords(copyMarkedRecords);
    } else {
      localStorage.setItem(id.toString(), id.toString());
      const copyMarkedRecords = { ...markedRecords };
      copyMarkedRecords[id.toString()] = id.toString();
      setMarkedRecords(copyMarkedRecords);
    }
  }
  // const markedRecords = useMemo(() => {
  //   return localStorage._keys;
  // }, [localStorage.length]);

  return (
    <div className="container">
      <DataList
        data={listData}
        headCells={headCells}
        markedRecords={markedRecords}
      />
    </div>
  );
}

export default App;
