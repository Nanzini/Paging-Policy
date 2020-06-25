const fcfs = () => {
  let pageTable = new Array(); //frame
  let frame = input_frame.value;
  let pageList = input_pageList.value;
  let cnt_pageFault = (cnt_pageHit = 0);
  let unfound, empty;

  if (divAll) clear();

  for (let i = 0; i < pageList.length; i++) {
    unfound = included(i, pageTable, pageList);

    if (unfound === true) {
      let tmp = {
        value: pageList[i],
        cue: i,
      };
      for (j = 0; j < frame; j++) {
        //j가 비어잇을 때 j에 값 넣기
        if (!pageTable[j]) {
          empty = true;
          pageTable.splice(j, 0, tmp);
          graph(pageTable, "#f7a260");
          break;
        }
        empty = false;
      }
      if (j == frame && empty === false) {
        let minIndex = getMin(pageTable);
        pageTable.splice(minIndex, 1);
        pageTable.splice(minIndex, 0, tmp);
        graph(pageTable, "#f7a260");
      }
      cnt_pageFault++;
    } else {
      cnt_pageHit++;
      graph(pageTable, "#a691e6");
    }
  }
  console.log("hit : " + cnt_pageHit);
  console.log("Falut : " + cnt_pageFault);
  chart(cnt_pageHit, cnt_pageFault);
};
