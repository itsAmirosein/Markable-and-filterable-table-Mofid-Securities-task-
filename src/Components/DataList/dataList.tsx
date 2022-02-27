import React from "react";
import { DataListType, HeadType } from "../../Types/dataTypes";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

interface DataListProps {
  data: DataListType;
  headCells: HeadType[];
  markedRecords: any;
}

function DataList({ data, headCells, markedRecords }: DataListProps) {
  return (
    <div>
      <table className="table">
        <thead>
          {headCells.map((headCell) => (
            <th
              onClick={() => {
                headCell.sort && headCell.sort.handleSort(headCell.id);
              }}
              className={`headCell ${headCell.sort && "pointer"}`}
            >
              {headCell.sort && headCell.sort.sortComponent}
              {headCell.title}
            </th>
          ))}
        </thead>
        <tbody>
          {data.data.map((item: { [unit: string]: any }) => {
            return (
              <tr>
                {headCells.map((headCell) => {
                  if (headCell.columnComponent) {
                    return (
                      <td
                        className={`bodyCell ${
                          headCell?.columnComponent && "pointer"
                        }`}
                        onClick={() =>
                          headCell?.columnComponent?.onClick(item.id)
                        }
                      >
                        {markedRecords[item.id.toString()] ? (
                          <div className="starIcon">
                            <AiFillStar />
                          </div>
                        ) : (
                          <div className="starIcon">
                            <AiOutlineStar />
                          </div>
                        )}
                      </td>
                    );
                  }
                  return <td className="bodyCell">{item[headCell.id]}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default DataList;
