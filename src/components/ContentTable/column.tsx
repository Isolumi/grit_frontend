import { Column } from "react-table";
import { useMemo, useState } from "react";
import { DropdownButton, Form } from "react-bootstrap";

export function getTableColumns(currentPage: number): Column<Data>[] {
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
        Header: "Billing Account Num",
        accessor: "billingAccountNum",
        width: 200,
        minWidth: 200,
        maxWidth: 200,
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
          const [filters, setFilters] = useState({
            bcc: false,
            rcl: false,
          });
          const handleCheckboxChange = (event: any) => {
            setFilters({
              ...filters,
              [event.target.name]: event.target.checked,
            });
            console.log('bcc: ' + filters.bcc)
            console.log('rcl: ' + filters.rcl)
          };

          return (
            <div>
              <DropdownButton id="headerBtn" title="Activity Code">
                <Form>
                  <div className="mr-3 ml-3 font-normal">
                    <Form.Check
                      name="bcc"
                      type="checkbox"
                      label="BCC"
                      checked={filters.bcc}
                      onChange={handleCheckboxChange}
                    />
                  </div>
                </Form>
                <Form>
                  <div className="mr-3 ml-3 font-normal">
                    <Form.Check
                      name="rcl"
                      type="checkbox"
                      label="RCL"
                      checked={filters.rcl}
                      onChange={handleCheckboxChange}
                    />
                  </div>
                </Form>
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
          const [isChecked, setChecked] = useState(false);

          const handleCheckboxChange = (event: any) => {
            setChecked(event.target.checked);
            console.log(isChecked);
          };
          return (
            <div>
              <DropdownButton id="headerBtn" title="Status Code">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
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
    [currentPage]
  );
}
