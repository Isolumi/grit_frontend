interface Data {
    id: String;
    createTs: Date;
    serviceType: String;
    requestType: String;
    txnSeqNo: Number;
    txnEffectiveTs: Date;
    billingAccountNum: Number;
    externalId: Number;
    subscriberNum: String;
    activityCd: String;
    overrideActivityCd: String;
    totalOffer: Number;
    hasSharedOffer: String;
    distributionId: Number;
    createdBy: String;
    statusCd: String;
    statusMessage: String;
    retryTimes: Number;
    reasonCd: String;
    processBy: String;
    processDuration: Number;
    lastUpdateTs: Date;
  }
  
  interface CellInfo {
    row: {
      index: number;
    };
  }