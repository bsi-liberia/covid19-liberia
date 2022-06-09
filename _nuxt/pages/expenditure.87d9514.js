(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{230:function(t,e,r){var content=r(364);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(50).default)("66549056",content,!0,{sourceMap:!1})},231:function(t,e,r){var content=r(366);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(50).default)("405b6889",content,!0,{sourceMap:!1})},359:function(t,e,r){"use strict";var n=r(362);e.a={extends:n.a,props:["data","options"],mounted:function(){this.addPlugin({id:"chartjs-plugin-datalabels"}),this.renderChart(this.data,this.options)},watch:{data:function(){this.renderChart(this.data,this.options)}}}},360:function(t,e,r){"use strict";var n=r(362),o=(r(370),{extends:n.b,props:["data","options"],mounted:function(){this.addPlugin({id:"chartjs-plugin-datalabels"}),this.renderChart(this.data,this.options)},watch:{data:function(){this.renderChart(this.data,this.options)}}}),l={name:"SummaryBarChart",components:{BarChart:r(359).a,PieChart:o},props:["barChartData","labelField","valueField","pctField","valueLabel","value2Label","value2Field","valuePrecision","step","chartType","commitments","maximumValues","colour","colour2","legend"],data:function(){return{colours:["#1f77b4","#ff7f0e","#2ca02c","#d62728","#9467bd","#8c564b","#e377c2","#7f7f7f","#bcbd22","#17becf"]}},computed:{tableFields:function(){return this.commitments?[{key:"source",sortable:!0},{key:"commitment",label:"USD",sortable:!0,formatter:"numberFormatter",class:"number-value"},{key:"commitment_pct",label:"%",sortable:!0,formatter:"numberFormatter",class:"number-value"},{key:"disbursement",label:"USD",sortable:!0,formatter:"numberFormatter",class:"number-value"},{key:"disbursement_pct",label:"%",sortable:!0,formatter:"numberFormatter",class:"number-value"},{key:"outstanding",label:"USD",sortable:!0,formatter:"numberFormatter",class:"number-value"},{key:"outstanding_pct",label:"%",sortable:!0,formatter:"numberFormatter",class:"number-value"}]:[{key:"source",sortable:!0},{key:"disbursement",label:"USD",sortable:!0,formatter:"numberFormatter",class:"number-value"},{key:"disbursement_pct",label:"%",sortable:!0,formatter:"numberFormatter",class:"number-value"}]},chartOptions:function(){var t=this,e={callbacks:{title:function(e,data){return t.chartData.labels[e[0].index]},label:function(e,data){var label=(0==e.datasetIndex?t.valueLabel:t.value2Label)||"";label&&(label+=": ");var r="bar"==t.chartType?e.yLabel:t.chartData.datasets[e.datasetIndex].data[e.index];return t.valuePrecision?label+=r.toLocaleString(void 0,{maximumFractionDigits:t.valuePrecision,minimumFractionDigits:t.valuePrecision}):label+=r,label},footer:function(e,data){if(t.pctField){var r=t.barChartData[e[0].index][t.pctField].toLocaleString(void 0,{maximumFractionDigits:1});return"".concat(r,"% of total")}}}},r={id:"y-axis-left",position:"left",ticks:{beginAtZero:!0,precision:this.valuePrecision,stepSize:this.step?this.step:void 0},scaleLabel:{display:!0,labelString:this.valueLabel},gridLines:{display:!1}},n={id:"y-axis-right",position:"right",ticks:{beginAtZero:!0,precision:this.valuePrecision,stepSize:this.step?this.step:void 0},scaleLabel:{display:!0,labelString:this.value2Label},gridLines:{display:!1}},o={yAxes:this.value2Label?[r,n]:[r],xAxes:[{ticks:{callback:function(t){return t.length>=20?t.slice(0,t.length).substring(0,19).trim()+"...":t}},gridLines:{display:!1}}]};return{maintainAspectRatio:!1,legend:"pie"==this.chartType||this.legend?{display:!0}:null,tooltips:e,scales:"bar"==this.chartType?o:null,layout:{padding:20},plugins:{datalabels:{backgroundColor:function(t){return t.dataset.backgroundColor},display:function(e){return!t.pctField||t.barChartData[e.dataIndex][t.pctField]>5},borderColor:"white",borderRadius:2,borderWidth:2,color:"white",textShadowColor:"#000000",textShadowBlur:2,font:{weight:"bold"},anchor:"end",align:"top"}}}},chartData:function(){var t=this,e=[{label:this.valueLabel,fill:!0,yAxisID:"y-axis-left",data:this.makeData(this.valueField),backgroundColor:this.colour?this.colour:this.colours,datalabels:{formatter:function(e,r){if(t.pctField){var n=t.barChartData[r.dataIndex][t.pctField].toLocaleString(void 0,{maximumFractionDigits:1});return"".concat(n,"%")}return e}}}];if(this.value2Label){var r={label:this.value2Label,fill:!0,yAxisID:"y-axis-right",data:this.makeData(this.value2Field),backgroundColor:this.colour2?this.colour2:this.colours,datalabels:{formatter:function(e,r){if(t.pctField){var n=t.barChartData[r.dataIndex][t.pctField].toLocaleString(void 0,{maximumFractionDigits:1});return"".concat(n,"%")}return e}}};e.push(r)}return{datasets:e,labels:this.makeLabels()}}},methods:{makeData:function(t){var e=this.barChartData.map((function(e){return e[t]})).slice(0,this.maximumValues);return this.barChartData.length>this.maximumValues&&e.push(this.barChartData.slice(this.maximumValues).reduce((function(e,r){return e+=r[t]}),0)),e},makeLabels:function(){var t=this,e=this.barChartData.map((function(e){return e[t.labelField]})).slice(0,this.maximumValues);return this.barChartData.length>this.maximumValues&&e.push("Other"),e},numberFormatter:function(t){return t?t.toLocaleString(void 0,{maximumFractionDigits:2,minimumFractionDigits:2}):""}}},c=(r(363),r(49)),component=Object(c.a)(l,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",["bar"==t.chartType?r("BarChart",{staticClass:"bar-chart",attrs:{data:t.chartData,options:t.chartOptions}}):t._e(),t._v(" "),"pie"==t.chartType?r("PieChart",{staticClass:"pie-chart",attrs:{data:t.chartData,options:t.chartOptions}}):t._e(),t._v(" "),"table"==t.chartType?r("b-table",{attrs:{items:t.barChartData,fields:t.tableFields,striped:""},scopedSlots:t._u([{key:"thead-top",fn:function(data){return[r("b-tr",[r("b-th"),t._v(" "),t.commitments?r("b-th",{staticClass:"number-value",attrs:{colspan:"2"}},[t._v("Commitments")]):t._e(),t._v(" "),r("b-th",{staticClass:"number-value",attrs:{colspan:"2"}},[t._v("Disbursements")]),t._v(" "),t.commitments?r("b-th",{staticClass:"number-value",attrs:{colspan:"2"}},[t._v("Outstanding")]):t._e()],1)]}}],null,!1,1685726835)}):t._e(),t._v(" "),t.barChartData.length>t.maximumValues&&"table"!=t.chartType?r("p",{staticClass:"text-muted mb-3 mt-3"},[t._v("\n    Showing the top "+t._s(t.maximumValues)+" entries. Change to "),r("b",[t._v("Table")]),t._v(" in\n    chart options to view all "+t._s(t.barChartData.length)+" entries.\n  ")]):t._e()],1)}),[],!1,null,"ccaa08c0",null);e.a=component.exports},361:function(t,e,r){"use strict";var n={name:"SocialMedia",components:{},props:["url"],data:function(){return{}}},o=(r(365),r(49)),component=Object(o.a)(n,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("b-row",[e("b-col",{staticClass:"mb-2"},[e("ShareNetwork",{attrs:{network:"twitter",url:this.url,title:"A dashboard of data on the COVID-19 response in Liberia.","twitter-user":"mfdp_lib"}},[e("font-awesome-icon",{attrs:{icon:["fab","twitter"]}})],1),this._v(" "),e("ShareNetwork",{attrs:{network:"facebook",url:this.url,title:"A dashboard of data on the COVID-19 response in Liberia."}},[e("font-awesome-icon",{attrs:{icon:["fab","facebook"]}})],1)],1)],1)],1)}),[],!1,null,"577f29da",null);e.a=component.exports},363:function(t,e,r){"use strict";var n=r(230);r.n(n).a},364:function(t,e,r){(e=r(48)(!1)).push([t.i,".bar-chart[data-v-ccaa08c0],.pie-chart[data-v-ccaa08c0]{height:400px}",""]),t.exports=e},365:function(t,e,r){"use strict";var n=r(231);r.n(n).a},366:function(t,e,r){(e=r(48)(!1)).push([t.i,"a[class^=share-network-][data-v-577f29da]{color:#fff;background-color:#333;border-radius:3px;cursor:pointer;margin:0 0 10px;padding:4px;font-size:.8rem}a[class^=share-network-] .fah[data-v-577f29da]{background-color:rgba(0,0,0,.2);padding:10px;flex:0 1 auto}a[class^=share-network-] span[data-v-577f29da]{flex:1 1;font-weight:500}a.share-network-twitter[data-v-577f29da],a.share-network-twitter[data-v-577f29da]:hover{color:#fff;background-color:#1da1f2}a.share-network-facebook[data-v-577f29da],a.share-network-facebook[data-v-577f29da]:hover{color:#fff;background-color:#1877f2}",""]),t.exports=e},367:function(t,e,r){var n=r(15),o=r(368)(!1);n(n.S,"Object",{values:function(t){return o(t)}})},368:function(t,e,r){var n=r(25),o=r(51),l=r(43),c=r(68).f;t.exports=function(t){return function(e){for(var r,d=l(e),m=o(d),h=m.length,i=0,f=[];h>i;)r=m[i++],n&&!c.call(d,r)||f.push(t?[r,d[r]]:d[r]);return f}}},369:function(t,e,r){var map={"./af":232,"./af.js":232,"./ar":233,"./ar-dz":234,"./ar-dz.js":234,"./ar-kw":235,"./ar-kw.js":235,"./ar-ly":236,"./ar-ly.js":236,"./ar-ma":237,"./ar-ma.js":237,"./ar-sa":238,"./ar-sa.js":238,"./ar-tn":239,"./ar-tn.js":239,"./ar.js":233,"./az":240,"./az.js":240,"./be":241,"./be.js":241,"./bg":242,"./bg.js":242,"./bm":243,"./bm.js":243,"./bn":244,"./bn.js":244,"./bo":245,"./bo.js":245,"./br":246,"./br.js":246,"./bs":247,"./bs.js":247,"./ca":248,"./ca.js":248,"./cs":249,"./cs.js":249,"./cv":250,"./cv.js":250,"./cy":251,"./cy.js":251,"./da":252,"./da.js":252,"./de":253,"./de-at":254,"./de-at.js":254,"./de-ch":255,"./de-ch.js":255,"./de.js":253,"./dv":256,"./dv.js":256,"./el":257,"./el.js":257,"./en-SG":258,"./en-SG.js":258,"./en-au":259,"./en-au.js":259,"./en-ca":260,"./en-ca.js":260,"./en-gb":261,"./en-gb.js":261,"./en-ie":262,"./en-ie.js":262,"./en-il":263,"./en-il.js":263,"./en-nz":264,"./en-nz.js":264,"./eo":265,"./eo.js":265,"./es":266,"./es-do":267,"./es-do.js":267,"./es-us":268,"./es-us.js":268,"./es.js":266,"./et":269,"./et.js":269,"./eu":270,"./eu.js":270,"./fa":271,"./fa.js":271,"./fi":272,"./fi.js":272,"./fo":273,"./fo.js":273,"./fr":274,"./fr-ca":275,"./fr-ca.js":275,"./fr-ch":276,"./fr-ch.js":276,"./fr.js":274,"./fy":277,"./fy.js":277,"./ga":278,"./ga.js":278,"./gd":279,"./gd.js":279,"./gl":280,"./gl.js":280,"./gom-latn":281,"./gom-latn.js":281,"./gu":282,"./gu.js":282,"./he":283,"./he.js":283,"./hi":284,"./hi.js":284,"./hr":285,"./hr.js":285,"./hu":286,"./hu.js":286,"./hy-am":287,"./hy-am.js":287,"./id":288,"./id.js":288,"./is":289,"./is.js":289,"./it":290,"./it-ch":291,"./it-ch.js":291,"./it.js":290,"./ja":292,"./ja.js":292,"./jv":293,"./jv.js":293,"./ka":294,"./ka.js":294,"./kk":295,"./kk.js":295,"./km":296,"./km.js":296,"./kn":297,"./kn.js":297,"./ko":298,"./ko.js":298,"./ku":299,"./ku.js":299,"./ky":300,"./ky.js":300,"./lb":301,"./lb.js":301,"./lo":302,"./lo.js":302,"./lt":303,"./lt.js":303,"./lv":304,"./lv.js":304,"./me":305,"./me.js":305,"./mi":306,"./mi.js":306,"./mk":307,"./mk.js":307,"./ml":308,"./ml.js":308,"./mn":309,"./mn.js":309,"./mr":310,"./mr.js":310,"./ms":311,"./ms-my":312,"./ms-my.js":312,"./ms.js":311,"./mt":313,"./mt.js":313,"./my":314,"./my.js":314,"./nb":315,"./nb.js":315,"./ne":316,"./ne.js":316,"./nl":317,"./nl-be":318,"./nl-be.js":318,"./nl.js":317,"./nn":319,"./nn.js":319,"./pa-in":320,"./pa-in.js":320,"./pl":321,"./pl.js":321,"./pt":322,"./pt-br":323,"./pt-br.js":323,"./pt.js":322,"./ro":324,"./ro.js":324,"./ru":325,"./ru.js":325,"./sd":326,"./sd.js":326,"./se":327,"./se.js":327,"./si":328,"./si.js":328,"./sk":329,"./sk.js":329,"./sl":330,"./sl.js":330,"./sq":331,"./sq.js":331,"./sr":332,"./sr-cyrl":333,"./sr-cyrl.js":333,"./sr.js":332,"./ss":334,"./ss.js":334,"./sv":335,"./sv.js":335,"./sw":336,"./sw.js":336,"./ta":337,"./ta.js":337,"./te":338,"./te.js":338,"./tet":339,"./tet.js":339,"./tg":340,"./tg.js":340,"./th":341,"./th.js":341,"./tl-ph":342,"./tl-ph.js":342,"./tlh":343,"./tlh.js":343,"./tr":344,"./tr.js":344,"./tzl":345,"./tzl.js":345,"./tzm":346,"./tzm-latn":347,"./tzm-latn.js":347,"./tzm.js":346,"./ug-cn":348,"./ug-cn.js":348,"./uk":349,"./uk.js":349,"./ur":350,"./ur.js":350,"./uz":351,"./uz-latn":352,"./uz-latn.js":352,"./uz.js":351,"./vi":353,"./vi.js":353,"./x-pseudo":354,"./x-pseudo.js":354,"./yo":355,"./yo.js":355,"./zh-cn":356,"./zh-cn.js":356,"./zh-hk":357,"./zh-hk.js":357,"./zh-tw":358,"./zh-tw.js":358};function n(t){var e=o(t);return r(e)}function o(t){if(!r.o(map,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return map[t]}n.keys=function(){return Object.keys(map)},n.resolve=o,t.exports=n,n.id=369},388:function(t,e,r){"use strict";r.r(e);r(42);var n=r(11),o=(r(10),r(93),r(94),r(2),r(1),r(367),r(92)),l=r(360),c=r(361),d={components:{BarChart:l.a,SocialMedia:c.a},data:function(){return{title:o.a.head.title,chartOptions:[{value:"pie",text:"Pie chart"},{value:"bar",text:"Bar chart"},{value:"table",text:"Table"}],expenditureBreakdown:"Type1",expenditureBreakdownOptions:[{value:"Type1",text:"Expenditure Category"},{value:"Type2",text:"Expenditure Subcategory"},{value:"Beneficiary Business",text:"Beneficiary Business"},{value:"Beneficiary Entity",text:"Beneficiary Entity"}],expenditureChartType:"bar",dateFilter:[],categoryFilter:[],subCategoryFilter:[],beneficiaryBusinessFilter:[],beneficiaryEntityFilter:[],maximumValues:10}},computed:{expenditureBreakdownLabel:function(){var t=this;return this.expenditureBreakdownOptions.filter((function(e){return e.value==t.expenditureBreakdown}))[0].text},lastUpdated:function(){return this.$store.state.lastUpdatedExpenditure},dateFilterOptions:function(){var t=["January","February","March","April","May","June","July","August","September","October","November","December"],e=Object.values(this.$store.state.expenditureData.reduce((function(e,r){var n=new Date(r.Dates);return"".concat(n.getFullYear(),"-").concat(n.getMonth())in e||(e["".concat(n.getFullYear(),"-").concat(n.getMonth())]={value:"".concat(n.getFullYear(),"-").concat(n.getMonth()),text:"".concat(t[n.getMonth()]," ").concat(n.getFullYear())}),e}),{}));return this.dateFilter=e.map((function(t){return t.value})),e},categoryFilterOptions:function(){var t=Object.values(this.$store.state.expenditureData.reduce((function(t,e){return e.Type1 in t||(t[e.Type1]={value:e.Type1,text:e.Type1}),t}),{}));return this.categoryFilter=t.map((function(t){return t.value})),t},subCategoryFilterOptions:function(){var t=Object.values(this.$store.state.expenditureData.reduce((function(t,e){return e.Type2 in t||(t[e.Type2]={value:e.Type2,text:e.Type2,category:e.Type1}),t}),{}));return this.subCategoryFilter=t.map((function(t){return t.value})),t},beneficiaryBusinessFilterOptions:function(){var t=Object.values(this.$store.state.expenditureData.reduce((function(t,e){return e["Beneficiary Business"]in t||(t[e["Beneficiary Business"]]={value:e["Beneficiary Business"],text:e["Beneficiary Business"]}),t}),{}));return this.beneficiaryBusinessFilter=t.map((function(t){return t.value})),t},beneficiaryEntityFilterOptions:function(){var t=Object.values(this.$store.state.expenditureData.reduce((function(t,e){return e["Beneficiary Entity"]in t||(t[e["Beneficiary Entity"]]={value:e["Beneficiary Entity"],text:e["Beneficiary Entity"]}),t}),{}));return this.beneficiaryEntityFilter=t.map((function(t){return t.value})),t},expenditureData:function(){var t=this;return this.$store.state.expenditureData.filter((function(e){return function(e){if(0==t.dateFilter.length)return!0;var r=new Date(e.Dates);return!!t.dateFilter.includes("".concat(r.getFullYear(),"-").concat(r.getMonth()))}(e)&&function(e){return 0==t.subCategoryFilter.length||!!t.subCategoryFilter.includes(e.Type2)}(e)&&function(e){return 0==t.beneficiaryBusinessFilter.length||!!t.beneficiaryBusinessFilter.includes(e["Beneficiary Business"])}(e)&&function(e){return 0==t.beneficiaryEntityFilter.length||!!t.beneficiaryEntityFilter.includes(e["Beneficiary Entity"])}(e)}))},expenditureTableFields:function(){return[{key:"Type1",label:"Category",sortable:!0},{key:"Type2",label:"Subcategory",sortable:!0},{key:"Dates",label:"Dates",sortable:!0,formatter:"dateFormatter"},{key:"Disbursement",label:"Amount (USD)",sortable:!0,formatter:"numberFormatter",class:"number-value"},{key:"Beneficiary Business",sortable:!0},{key:"Beneficiary Entity",sortable:!0}]},expenditureSummary:function(){var t=this,e=this.expenditureData.reduce((function(t,e){return t+=e.Disbursement}),0);return Object.values(this.expenditureData.reduce((function(summary,r){return"#ERROR!"!=r.Commitment&&(summary[r[t.expenditureBreakdown]]?(summary[r[t.expenditureBreakdown]].disbursement+=r.Disbursement,summary[r[t.expenditureBreakdown]].disbursement_pct+=r.Disbursement/e*100):summary[r[t.expenditureBreakdown]]={source:r[t.expenditureBreakdown],disbursement:r.Disbursement,disbursement_pct:r.Disbursement/e*100}),summary}),{})).sort((function(a,b){return a.disbursement<b.disbursement?-1:1})).reverse()}},methods:{makeNumber:function(t){var e=parseFloat(t.replace(/,/g,""));return isNaN(e)?0:e},dateFormatter:function(t){return t?t.toISOString().substr(0,10):""},numberFormatter:function(t){return t?t.toLocaleString(void 0,{maximumFractionDigits:2,minimumFractionDigits:2}):""},loadData:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$store.dispatch("getData");case 2:t.$nuxt.$loading.finish();case 3:case"end":return e.stop()}}),e)})))()}},watch:{categoryFilter:{handler:function(t){var e=this;this.subCategoryFilterOptions.forEach((function(r){if(t.includes(r.category))e.subCategoryFilter.includes(r.value)||e.subCategoryFilter.push(r.value);else if(e.subCategoryFilter.includes(r.value)){var n=e.subCategoryFilter.indexOf(r.value);n>-1&&e.subCategoryFilter.splice(n,1)}}))}}}},m=r(49),component=Object(m.a)(d,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("b-container",[r("b-row",[r("b-col",{attrs:{md:"8"}},[r("h2",[t._v("Expenditure")])]),t._v(" "),r("b-col",{staticClass:"text-md-right",attrs:{md:"4"}},[r("b-badge",{staticClass:"last-updated",attrs:{variant:"light"}},[t._v("as of "+t._s(t.lastUpdated))]),t._v(" "),r("br"),t._v(" "),r("SocialMedia",{attrs:{url:"http://covid19response.gov.lr/expenditure/"}})],1)],1),t._v(" "),0==t.expenditureData.length?[r("div",{staticClass:"text-center text-secondary"},[r("hr"),t._v(" "),r("b-spinner",{staticClass:"align-middle"}),t._v(" "),r("strong",[t._v("Loading...")]),t._v(" "),r("hr")],1)]:[r("h3",[t._v("Summary by "+t._s(t.expenditureBreakdownLabel))]),t._v(" "),r("b-row",{staticClass:"mb-2"},[r("b-col",[r("BarChart",{attrs:{barChartData:t.expenditureSummary,labelField:"source",valueLabel:"Spending (USD)",valueField:"disbursement",valuePrecision:"2",chartType:t.expenditureChartType,pctField:"disbursement_pct",commitments:!1,maximumValues:t.maximumValues}})],1)],1),t._v(" "),r("b-button",{directives:[{name:"b-toggle",rawName:"v-b-toggle.sidebar-filters",modifiers:{"sidebar-filters":!0}}],staticClass:"mt-2",attrs:{size:"sm",variant:"secondary",block:""}},[r("font-awesome-icon",{attrs:{icon:["fas","cog"]}}),t._v(" "),r("b",[t._v("Chart options")])],1),t._v(" "),r("hr"),t._v(" "),r("h3",[t._v("Data")]),t._v(" "),r("b-table",{attrs:{items:t.expenditureData,fields:t.expenditureTableFields,striped:"",responsive:""}}),t._v(" "),r("b-sidebar",{attrs:{id:"sidebar-filters",title:"Chart options",shadow:"lg"}},[r("div",{staticClass:"px-3 py-2"},[r("h5",[t._v("Display as")]),t._v(" "),r("b-form-radio-group",{staticClass:"mb-2",staticStyle:{width:"100%"},attrs:{options:t.chartOptions,buttons:"","button-variant":"outline-primary"},model:{value:t.expenditureChartType,callback:function(e){t.expenditureChartType=e},expression:"expenditureChartType"}}),t._v(" "),r("hr"),t._v(" "),r("h5",[t._v("Breakdown by")]),t._v(" "),r("b-form-group",{staticClass:"mb-2"},[r("b-form-select",{attrs:{options:t.expenditureBreakdownOptions},model:{value:t.expenditureBreakdown,callback:function(e){t.expenditureBreakdown=e},expression:"expenditureBreakdown"}})],1),t._v(" "),r("hr"),t._v(" "),r("h5",[t._v("Filters")]),t._v(" "),r("b-form-group",{attrs:{label:"Category"}},[r("b-form-checkbox-group",{attrs:{options:t.categoryFilterOptions,stacked:""},model:{value:t.categoryFilter,callback:function(e){t.categoryFilter=e},expression:"categoryFilter"}})],1),t._v(" "),r("b-form-group",{attrs:{label:"Subcategory"}},[r("b-form-checkbox-group",{attrs:{options:t.subCategoryFilterOptions,stacked:""},model:{value:t.subCategoryFilter,callback:function(e){t.subCategoryFilter=e},expression:"subCategoryFilter"}})],1),t._v(" "),r("b-form-group",{attrs:{label:"Beneficiary Business"}},[r("b-form-checkbox-group",{attrs:{options:t.beneficiaryBusinessFilterOptions,stacked:""},model:{value:t.beneficiaryBusinessFilter,callback:function(e){t.beneficiaryBusinessFilter=e},expression:"beneficiaryBusinessFilter"}})],1),t._v(" "),r("b-form-group",{attrs:{label:"Beneficiary Entity"}},[r("b-form-checkbox-group",{attrs:{options:t.beneficiaryEntityFilterOptions,stacked:""},model:{value:t.beneficiaryEntityFilter,callback:function(e){t.beneficiaryEntityFilter=e},expression:"beneficiaryEntityFilter"}})],1),t._v(" "),r("b-form-group",{attrs:{label:"Dates"}},[r("b-form-checkbox-group",{attrs:{options:t.dateFilterOptions,stacked:""},model:{value:t.dateFilter,callback:function(e){t.dateFilter=e},expression:"dateFilter"}})],1),t._v(" "),r("hr"),t._v(" "),r("h5",[t._v("Maximum values")]),t._v(" "),r("b-form-group",{attrs:{description:"Show the top "+t.maximumValues+" values"}},[r("b-form-select",{attrs:{options:[5,10,20,100]},model:{value:t.maximumValues,callback:function(e){t.maximumValues=e},expression:"maximumValues"}})],1)],1)])]],2)],1)}),[],!1,null,"3a16ba3b",null);e.default=component.exports}}]);