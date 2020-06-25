const optimal = () => {
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
        victim: true,
        cue: 0,
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
        let cnt = 0;
        debugger;
        //셋팅
        for (let k = i; k < pageList.length; k++) {
          if (cnt === pageTable.length) break;
          let index = advIncluded(k, pageTable, pageList);
          if (index > -1) {
            pageTable[index].victim = false;
            pageTable[index].cue = k;
            cnt++;
          }
        }

        //삭제
        //1 victim true
        //2 cue 제일작은 거
        let getVic = getVictim(pageTable);
        if (getVic > -1) {
          pageTable.splice(getVic, 1);
          pageTable.splice(getVic, 0, tmp);
          graph(pageTable, "#f7a260");
        } else {
          let minIndex = getMax(pageTable);
          pageTable.splice(minIndex, 1);
          pageTable.splice(minIndex, 0, tmp);
          graph(pageTable, "#f7a260");
        }

        for (let i = 0; i < pageTable.length; i++) {
          pageTable[i].victim = true;
          pageTable[i].cue = 0;
        }
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
