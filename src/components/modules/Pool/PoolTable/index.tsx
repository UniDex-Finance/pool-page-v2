/* eslint-disable react-refresh/only-export-components */
import { useEffect } from "react";
// import { useEthers } from "@usedapp/core";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Card } from "@material-tailwind/react";
import { createPoolRows } from "../../../../helpers";
import { PoolRow } from "../../../../types";
import Columns from "./Columns";
import RowDataProvider from "./RowDataProvider";

const JUSTIFY_CENTER_INDICIES = [0, 7, 8, 9];

type Props = {
  poolRows: PoolRow[];
  setPoolRows: React.Dispatch<React.SetStateAction<PoolRow[]>>;
  doNotUpdatePoolRowsRef: React.MutableRefObject<boolean>;
};

export default ({ poolRows, setPoolRows, doNotUpdatePoolRowsRef }: Props) => {
  // const { chainId } = useEthers();

  const table = useReactTable({
    columns: Columns({ setPoolRows, doNotUpdatePoolRowsRef }),
    data: poolRows,
    getCoreRowModel: getCoreRowModel(),
  });

  /*
  const sortPoolRowsChainIdMatch = () => {
    setPoolRows((prevPoolRows) => {
      const poolRowsNew = prevPoolRows.sort((a, b) => {
        if (a.chainId === chainId && b.chainId !== chainId) {
          return 1;
        }
        if (a.chainId === chainId && b.chainId === chainId) {
          return 0;
        }
        return -1;
      });

      return poolRowsNew;
    });
  };
  */

  const init = () => {
    const poolRowsChainData = createPoolRows();
    setPoolRows(poolRowsChainData);
  };

  /*
  useEffect(() => {
    sortPoolRowsChainIdMatch();
  }, [chainId]);
  */

  useEffect(() => {
    init();
  }, []);

  return (
    <Card className="bg-main-card py-4 px-2 rounded-lg h-[1000px] overflow-y-scroll scrollbar-thin scrollbar-thumb-[#575e62]">
      <table>
        <thead className="text-secondary-text">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header, indexHeader) => (
                <th
                  key={header.id}
                  className={`whitespace-nowrap pb-2 ${
                    !JUSTIFY_CENTER_INDICIES.includes(indexHeader)
                      ? "text-left px-4"
                      : ""
                  }`}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="text-[17px] font-semibold">
  {table.getRowModel().rows.map((row, indexRow) => (
    <tr key={row.id}>
      <RowDataProvider
        chainIdRow={row.getValue("chainId")}
        collateralRow={row.getValue("collateral")}
        setPoolRows={setPoolRows}
        index={indexRow}
        doNotUpdatePoolRowsRef={doNotUpdatePoolRowsRef}
      />
      {row.getVisibleCells().map((cell, indexCell) => (
        <td key={cell.id}>
<div
  className={`flex py-2.5 px-4 ${
    JUSTIFY_CENTER_INDICIES.includes(indexCell)
      ? "justify-center"
      : "justify-start"
  } ${
    cell.column.id === "rewardApr" && cell.getValue() > 0
      ? "text-gold"
      : ""
  }`}
>
  {flexRender(cell.column.columnDef.cell, cell.getContext())}
</div>
        </td>
      ))}
    </tr>
  ))}
</tbody>
      </table>
    </Card>
  );
};
