const input_frame = document.getElementById("frame");
const input_pageList = document.getElementById("pageList");
const input_accessTime = document.getElementById("accessTime");
const input_faultTime = document.getElementById("faultTime");

const btn_FCFS = document.getElementById("btn_FCFS");
const btn_Cnt = document.getElementById("btn_Cnt");
const btn_Ref = document.getElementById("btn_Ref");
const btn_SecondChance = document.getElementById("btn_SecondChance");
const btn_optimal = document.getElementById("btn_optimal");

const explain1 = document.getElementById("explain1");
const explain2 = document.getElementById("explain2");
const explain3 = document.getElementById("explain3");

const div_graph = document.getElementById("graph");
const div_chart = document.querySelector(".chart");
const divAll = div_graph.querySelectorAll("div");
const div_brief = document.getElementById("brief");

const init = () => {
  btn_FCFS.addEventListener("click", fcfs);
  btn_Cnt.addEventListener("click", count);
  btn_Ref.addEventListener("click", ref);
  btn_SecondChance.addEventListener("click", secondChance);
  btn_optimal.addEventListener("click", optimal);
};

init();

const included = (i, pageTable, pageList) => {
  for (j = 0; j < frame.value; j++) {
    if (!pageTable[j] || pageTable[j].value !== pageList[i]) unfound = true;
    else return false;
  }
  return unfound;
};

const advIncluded = (i, pageTable, pageList) => {
  for (let j = 0; j < frame.value; j++) {
    if (!pageTable[j] || pageTable[j].value !== pageList[i]) unfound = true;
    else return j;
  }
  return -1;
};

const cnt_notIncluded = (i, pageTable, pageList) => {
  for (j = 0; j < frame.value; j++) {
    if (!pageTable[j] || pageTable[j].value === pageList[i]) {
      pageTable[j].cue++;
      break;
    }
  }
};

const ref_notIncluded = (i, pageTable, pageList) => {
  for (j = 0; j < frame.value; j++) {
    if (!pageTable[j] || pageTable[j].value === pageList[i]) {
      pageTable[j].cue = 1;
      break;
    }
  }
};

const getSecondIndex = (pointer, pageTable) => {
  selected = false;
  //j가 frame보다 커지면 0으로
  for (let j = pointer; !selected; j++) {
    if (j > frame.value) j = 0;
    if (!pageTable[j] || pageTable[j].cue === 0) return j;
    else pageTable[j].cue = 0;
  }
  return -1;
};

const getMin = (pageTable) => {
  let min = pageTable[0].cue;
  let index = 0;
  for (i = 1; i < frame.value; i++) {
    if (pageTable[i].cue < min) {
      min = pageTable[i].cue;
      index = i;
    }
  }

  return index;
};

const getMax = (pageTable) => {
  let max = pageTable[0].cue;
  let index = 0;
  for (i = 1; i < frame.value; i++) {
    if (pageTable[i].cue > max) {
      max = pageTable[i].cue;
      index = i;
    }
  }

  return index;
};

const getVictim = (pageTable) => {
  for (let j = 0; j < pageTable.length; j++)
    if (pageTable[j].victim === true) return j;
  return -1;
};

const graph = (pageTable, color) => {
  //pageTable그리기
  const tableFrame = document.createElement("div");
  for (let i = 0; i < input_frame.value; i++) {
    const oneFrame = document.createElement("div");
    if (pageTable[i])
      oneFrame.innerHTML = pageTable[i].value + " (" + pageTable[i].cue + ")";
    tableFrame.appendChild(oneFrame);
  }
  tableFrame.style.borderColor = color;
  div_graph.appendChild(tableFrame);
};

const chart = (hit, fault) => {
  let accessTime = input_accessTime.value;
  let serviceTime = input_faultTime.value;

  if (!accessTime || !serviceTime) {
    accessTime = 1;
    serviceTime = 20000;
  }

  let runTime = fault * serviceTime + accessTime * hit;
  let faultRate = fault / (hit + fault);

  for (let i = 0; i < fault; i++) {
    const tmp = document.createElement("div");
    tmp.style.backgroundColor = `#f7a260`;
    div_chart.appendChild(tmp);
  }
  for (let i = 0; i < hit; i++) {
    const tmp2 = document.createElement("div");
    tmp2.style.backgroundColor = `#a691e6`;
    div_chart.appendChild(tmp2);
  }

  const tmp = document.createElement("div");
  tmp.innerText = "Fault Rate " + faultRate * 100 + "%";
  div_brief.appendChild(tmp);
  explain1.innerHTML =
    "주황 : Fault (Fault Service Time : " + serviceTime + ")";
  explain2.innerHTML = "보라 : Hit (Memory Access Time : " + accessTime + ")";

  explain3.innerHTML = "전체실행시간 : " + runTime + "<br>";
};

const clear = () => {
  const div_graph_All = div_graph.querySelectorAll("div");
  const div_chart_All = div_chart.querySelectorAll("div");
  const div_brief_All = div_brief.querySelectorAll("div");

  for (let i = 0; i < div_graph_All.length; i++) div_graph_All[i].remove();
  for (let i = 0; i < div_chart_All.length; i++) div_chart_All[i].remove();
  for (let i = 0; i < div_brief_All.length; i++) div_brief_All[i].remove();
};
