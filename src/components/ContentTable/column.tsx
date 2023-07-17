import { Column } from "react-table";
import { useMemo, useState, useEffect } from "react";
import { DropdownButton, Button, Dropdown } from "react-bootstrap";
import FilterBox from "./FilterBox";
import { useNavigate } from "react-router-dom";

export function getTableColumns(
  currentPage: number,
  acFilters: AcFilters,
  scFilters: ScFilters,
  setAcFilters: any,
  setScFilters: any,
  data: Data[]
): Column<Data>[] {
  const navigate = useNavigate();

  const handleAcFilters = (newAcFilters: AcFilters) => {
    setAcFilters(newAcFilters);
    setBtn(!btn);
  };
  const handleScFilters = (newScFilters: ScFilters) => {
    setScFilters(newScFilters);
    setBtn(!btn);
  };

  const [btn, setBtn] = useState(false);
  const [isFilter, setIsFilter] = useState<boolean>(false);
  const [displayedData, setDisplayedData] = useState<Data[]>([]);

  useEffect(() => {
    if (!isFilter) {
      console.log('false');
      const seen = new Set();
      const uniqueData = data.filter((el) => {
        const duplicate = seen.has(el.billingAccountNum);
        seen.add(el.billingAccountNum);
        return !duplicate;
      });
      setDisplayedData(uniqueData);
    } else {
      console.log('true');
    }
  }, [data]);

  return useMemo<Column<Data>[]>(
    () => [
      {
        Header: "Row",
        Cell: ({ row: { index } }: CellInfo) => (
          <div>{10 * currentPage + index + 1}</div>
        ),
      },
      {
        Header: "ID",
        accessor: "id",
        width: 350,
        minWidth: 350,
        maxWidth: 350,
      },
      {
        Header: "CreateTs",
        accessor: "createTs",
        width: 200,
        minWidth: 200,
        maxWidth: 200,
      },
      {
        Header: "Service Type",
        accessor: "serviceType",
        width: 200,
        minWidth: 200,
        maxWidth: 200,
      },
      {
        Header: "Request Type",
        accessor: "requestType",
        width: 150,
        minWidth: 150,
        maxWidth: 150,
      },
      {
        Header: "TxnSeqNo",
        accessor: "txnSeqNo",
      },
      {
        Header: "TxnEffectiveTs",
        accessor: "txnEffectiveTs",
      },
      {
        Header: () => {
          const handleFilterSelect = (item: Data) => {
            setIsFilter(true);
            navigate(`/?BAN=${item.billingAccountNum}`);
          };
          const handleBtn = () => {
            setIsFilter(false);
            navigate(`/`)
          }

          return (
            <DropdownButton id="headerBtn" title="Billing Account Number">
              <div className="flex flex-col justify-center">
                {displayedData.map((item, index) => (
                  <Dropdown.Item
                    key={index}
                    eventKey={index}
                    onClick={() => {
                      handleFilterSelect(item);
                    }}
                  >
                    {item.billingAccountNum.toString()}
                  </Dropdown.Item>
                ))}
                <Button size="sm" onClick={handleBtn}>Reset</Button>
              </div>
            </DropdownButton>
          );
        },
        accessor: "billingAccountNum",
        width: 250,
        minWidth: 250,
        maxWidth: 250,
      },
      {
        Header: "External ID",
        accessor: "externalId",
        width: 200,
        minWidth: 200,
        maxWidth: 200,
      },
      {
        Header: "Subscriber Num",
        accessor: "subscriberNum",
        width: 200,
        minWidth: 200,
        maxWidth: 200,
      },
      {
        Header: () => {
          const [currFilters, setCurrFilters] = useState({
            bcc: acFilters.bcc,
            rcl: acFilters.rcl,
            sch: acFilters.sch,
            sus: acFilters.sus,
            rsp: acFilters.rsp,
            nac: acFilters.nac,
            ub: acFilters.ub,
            bl: acFilters.bl,
            can: acFilters.can,
            mcn: acFilters.mcn,
          });
          const handleCurrFilters = (event: any) => {
            setCurrFilters({
              ...currFilters,
              [event.target.name]: event.target.checked,
            });
          };
          return (
            <div>
              <DropdownButton id="headerBtn" title="Activity Code">
                <div className="flex flex-col justify-center">
                  <FilterBox
                    id="bcc"
                    filters={currFilters}
                    handleFilters={handleCurrFilters}
                  />
                  <FilterBox
                    id="rcl"
                    filters={currFilters}
                    handleFilters={handleCurrFilters}
                  />
                  <FilterBox
                    id="sch"
                    filters={currFilters}
                    handleFilters={handleCurrFilters}
                  />
                  <FilterBox
                    id="sus"
                    filters={currFilters}
                    handleFilters={handleCurrFilters}
                  />
                  <FilterBox
                    id="rsp"
                    filters={currFilters}
                    handleFilters={handleCurrFilters}
                  />
                  <FilterBox
                    id="nac"
                    filters={currFilters}
                    handleFilters={handleCurrFilters}
                  />
                  <FilterBox
                    id="ub"
                    filters={currFilters}
                    handleFilters={handleCurrFilters}
                  />
                  <FilterBox
                    id="bl"
                    filters={currFilters}
                    handleFilters={handleCurrFilters}
                  />
                  <FilterBox
                    id="can"
                    filters={currFilters}
                    handleFilters={handleCurrFilters}
                  />
                  <FilterBox
                    id="mcn"
                    filters={currFilters}
                    handleFilters={handleCurrFilters}
                  />

                  <Button
                    size="sm"
                    onClick={() => handleAcFilters(currFilters)}
                  >
                    Filter
                  </Button>
                </div>
              </DropdownButton>
            </div>
          );
        },
        accessor: "activityCd",
        width: 200,
        minWidth: 200,
        maxWidth: 200,
      },
      {
        Header: "Override Activity Cd",
        accessor: "overrideActivityCd",
        width: 200,
        minWidth: 200,
        maxWidth: 200,
      },
      {
        Header: "Total Offer",
        accessor: "totalOffer",
        width: 200,
        minWidth: 200,
        maxWidth: 200,
      },
      {
        Header: "Has Shared Offer",
        accessor: "hasSharedOffer",
        width: 200,
        minWidth: 200,
        maxWidth: 200,
      },
      {
        Header: "Distribution ID",
        accessor: "distributionId",
        width: 200,
        minWidth: 200,
        maxWidth: 200,
      },
      {
        Header: "Created By",
        accessor: "createdBy",
        width: 200,
        minWidth: 200,
        maxWidth: 200,
      },
      {
        Header: () => {
          const [currFilters, setCurrFilters] = useState({
            success: scFilters.success,
            error: scFilters.error,
          });
          const handleCurrFilters = (event: any) => {
            setCurrFilters({
              ...currFilters,
              [event.target.name]: event.target.checked,
            });
          };
          return (
            <div>
              <DropdownButton id="headerBtn" title="Status Code">
                <div className="flex flex-col justify-center">
                  <FilterBox
                    id="success"
                    filters={currFilters}
                    handleFilters={handleCurrFilters}
                  />
                  <FilterBox
                    id="error"
                    filters={currFilters}
                    handleFilters={handleCurrFilters}
                  />

                  <Button
                    size="sm"
                    onClick={() => handleScFilters(currFilters)}
                  >
                    Filter
                  </Button>
                </div>
              </DropdownButton>
            </div>
          );
        },
        accessor: "statusCd",
        width: 200,
        minWidth: 200,
        maxWidth: 200,
      },
      {
        Header: "Status Message",
        accessor: "statusMessage",
        width: 200,
        minWidth: 200,
        maxWidth: 200,
      },
      {
        Header: "Retry Times",
        accessor: "retryTimes",
        width: 200,
        minWidth: 200,
        maxWidth: 200,
      },
      {
        Header: "ReasonCd",
        accessor: "reasonCd",
        width: 200,
        minWidth: 200,
        maxWidth: 200,
      },
      {
        Header: "Process By",
        accessor: "processBy",
        width: 200,
        minWidth: 200,
        maxWidth: 200,
      },
      {
        Header: "Process Duration",
        accessor: "processDuration",
        width: 200,
        minWidth: 200,
        maxWidth: 200,
      },
      {
        Header: "Last Update Ts",
        accessor: "lastUpdateTs",
        width: 200,
        minWidth: 200,
        maxWidth: 200,
      },
    ],
    [currentPage, btn, data, isFilter]
  );
}
