(this["webpackJsonpreact-d3-example1"]=this["webpackJsonpreact-d3-example1"]||[]).push([[0],{102:function(e,t,a){},106:function(e,t,a){},107:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),s=a(36),i=a.n(s),o=(a(102),a(7)),c=a(8),u=a(3),l=a(10),p=a(9),D=a(0),T=a(2),f=a.n(T),m=a(37),h=a.n(m),y=40,A=20,d=20,S=40,E=[[0,"S"],[1,"M"],[2,"T"],[3,"W"],[4,"Th"],[5,"F"],[6,"Sa"]],k=(D.h().domain([0,1,2,3,4,5,6]).range([S,900-A]),function(e){var t=D.b(Object.keys(e),(function(e){return new Date(e)})),a=D.i().domain(t).range([550-d,y]),n=D.m.range(t[0],D.m.offset(t[1],1));return n=n.map((function(e){return{week:e,x:S,y:a(e)+550}}))}),g=D.i().domain([0,6]).range([S,900-A]),O=(900-S-A)/2,P=function(e){var t=e.expenses,a=e.selectedWeek,n=D.b(Object.keys(t),(function(e){return new Date(e)})),r=D.i().domain(n).range([550-d,y]);return f.a.chain(t).map((function(e,t){return t=new Date(t),f.a.map(e,(function(e){var n=g(e.WeekDay),s=r(new Date(t))+550;if(t.getTime()===a.getTime()){var i=Math.PI/6,o=Math.PI-i*e.WeekDay;n=O*Math.cos(o)+O+S,s=O*Math.sin(o)+y}return Object.assign(e,{focusX:n,focusY:s})}))})).flatten().value()},v=a(14),x=(900-S-A)/2,C=Math.PI/6,b=function(e){return f.a.map(e,(function(e){var t=Object(v.a)(e,2),a=t[0],n=t[1],r=Math.PI-C*a;return{name:n,cx:x*Math.cos(r)+x+S,cy:x*Math.sin(r)+y}}))},I=h.a.scale(["#42e9f5","lightblue","#ff69b6"]),R=D.j(),j=D.d().alphaDecay(.001).velocityDecay(.3).force("collide",D.c(10)).force("x",D.e((function(e){return e.focusX}))).force("y",D.f((function(e){return e.focusY}))).stop(),M=D.a(),G=function(e){Object(l.a)(a,e);var t=Object(p.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).state={selectedWeek:null},n.forceTick=n.forceTick.bind(Object(u.a)(n)),n.dragStart=n.dragStart.bind(Object(u.a)(n)),n.dragExpense=n.dragExpense.bind(Object(u.a)(n)),n.dragEnd=n.dragEnd.bind(Object(u.a)(n)),j.on("tick",n.forceTick),n}return Object(c.a)(a,[{key:"componentDidMount",value:function(){this.container=D.k(this.refs.container),this.calculateData(),this.renderDayCircles(),this.renderWeeks(),this.renderCircles(),j.nodes(this.expenses).alpha(.9).restart(),M.on("start",this.dragStart).on("drag",this.dragExpense).on("end",this.dragEnd)}},{key:"componentDidUpdate",value:function(){this.calculateData(),this.renderCircles(),j.nodes(this.expenses).alpha(.9).restart()}},{key:"calculateData",value:function(){this.expenses=P(this.props),this.weeks=k(this.props.expenses),this.daysofweek=b(E);var e=D.b(this.expenses,(function(e){return e.Amount}));R.domain(e)}},{key:"renderCircles",value:function(){this.circles=this.container.selectAll(".expenses").data(this.expenses,(function(e){return e.name})),this.circles.exit().remove(),this.circles=this.circles.enter().append("circle").classed("expenses",!0).merge(this.circles).attr("r",(function(e){return 10})).attr("fill-opacity",.25).attr("stroke-width",3).call(M).merge(this.circles).attr("fill",(function(e){return I(R(e.Amount))})).attr("stroke",(function(e){return I(R(e.Amount))}))}},{key:"renderDayCircles",value:function(){var e=this.container.selectAll(".days").data(this.daysofweek,(function(e){return e.name})).enter().append("g").classed("days",!0).attr("transform",(function(e){return"translate("+[e.cx,e.cy]+")"}));e.append("circle").attr("r",(function(e){return 60})).attr("opacity",.25).attr("fill","#97FFD1"),e.append("text").attr("y",75).attr("text-anchor","middle").attr("dy",".35em").attr("fill","#06DD88").attr("font-weight",600).text((function(e){return e.name}))}},{key:"renderWeeks",value:function(){var e=this.container.selectAll(".weeks").data(this.weeks,(function(e){return e.name})).enter().append("g").classed("week",!0).attr("transform",(function(e){return"translate("+[e.x,e.y]+")"}));e.append("rect").attr("width",900-S-A).attr("height",10).attr("fill","pink").attr("opacity",.25);var t=D.l("%m/%d");e.append("text").attr("text-anchor","end").attr("dy",".35em").text((function(e){return t(e.week)}))}},{key:"forceTick",value:function(){this.circles.attr("cx",(function(e){return e.x})).attr("cy",(function(e){return e.y}))}},{key:"dragStart",value:function(e){e.active||j.alphaTarget(.3).restart(),e.subject.fx=e.subject.x,e.subject.fy=e.subject.y}},{key:"dragExpense",value:function(e){var t=this;this.dragged=null,e.subject.fx=e.x,e.subject.fy=e.y;var a=e.x,n=e.y,r=e.subject;f.a.each(this.props.categories,(function(e){var s=e.x,i=e.y,o=e.radius;s-o/2<a&&s+o/2>a&&i-o/2<n&&i+o/2>n&&(t.dragged={expense:r,category:e})}))}},{key:"dragEnd",value:function(e){if(e.active||j.alphaTarget(0),e.subject.fx=null,e.subject.fy=null,this.dragged){var t=this.dragged,a=t.expense,n=t.category;this.props.linkToCategory(a,n)}this.dragged=null}},{key:"render",value:function(){return r.a.createElement("g",{ref:"container"})}}]),a}(n.Component),W=D.i().range([15,50]),w=D.d().alphaDecay(.001).velocityDecay(.3).force("collide",D.c((function(e){return e.radius+5}))).force("x",D.e((function(e){return e.focusX}))).force("y",D.f((function(e){return e.focusY}))).stop(),L=function(e){Object(l.a)(a,e);var t=Object(p.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).state={},n.forceTick=n.forceTick.bind(Object(u.a)(n)),w.on("tick",n.forceTick),n}return Object(c.a)(a,[{key:"componentDidMount",value:function(){this.container=D.k(this.refs.categoryContainer),this.calculateData(),this.renderLinks(),this.renderCircles(),w.nodes(this.props.categories).alpha(.9).restart()}},{key:"componentDidUpdate",value:function(){this.calculateData(),this.renderLinks(),this.renderCircles()}},{key:"calculateData",value:function(){var e=D.b(this.props.categories,(function(e){return e.total}));W.domain(e),this.categories=f.a.map(this.props.categories,(function(e){return Object.assign(e,{focusX:450,focusY:550/3,radius:W(e.total)})}))}},{key:"renderLinks",value:function(){this.lines=this.container.selectAll("line").data(this.props.links),this.lines.exit().remove(),this.lines=this.lines.enter().insert("line","g").merge(this.lines).attr("stroke","#666")}},{key:"renderCircles",value:function(){this.circles=this.container.selectAll("g").data(this.categories),this.circles.exit().remove();var e=this.circles.enter().append("g");e.append("circle").attr("fill","#fff").attr("stroke","#666").attr("stroke-width",2),e.append("text").attr("text-anchor","middle").attr("dy",".35em"),this.circles=e.merge(this.circles),this.circles.select("circle").attr("r",(function(e){return e.radius})),this.circles.select("text").text((function(e){return e.name}))}},{key:"forceTick",value:function(){this.circles.attr("transform",(function(e){return"translate("+[e.x,e.y]+")"})),this.lines.attr("x1",(function(e){return e.source.x})).attr("y1",(function(e){return e.source.y})).attr("x2",(function(e){return e.target.x})).attr("y2",(function(e){return e.target.y}))}},{key:"render",value:function(){return r.a.createElement("g",{ref:"categoryContainer"})}}]),a}(n.Component),N=function(e){return f.a.chain(e).filter((function(e){return e.Amount<0})).map((function(e){var t=e.Description,a=new Date(e["Trans Date"]);return{Description:t,Amount:e.Amount<0?-e.Amount:e.Amount,date:a,WeekDay:a.getDay()}})).groupBy((function(e){return D.m.floor(e.date)})).value()},B=a(38),Q=(a(106),function(e){Object(l.a)(a,e);var t=Object(p.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).state={expenses:[],categories:[{name:"Parking",expenses:[],total:0},{name:"Restaurants",expenses:[],total:0}],selectedWeek:null},n.prevWeek=n.prevWeek.bind(Object(u.a)(n)),n.nextWeek=n.nextWeek.bind(Object(u.a)(n)),n.linkToCategory=n.linkToCategory.bind(Object(u.a)(n)),n}return Object(c.a)(a,[{key:"componentWillMount",value:function(){var e=N(B),t=D.g(Object.keys(e),(function(e){return new Date(e)}));this.setState({expenses:e,selectedWeek:t})}},{key:"prevWeek",value:function(){var e=D.m.offset(this.state.selectedWeek,-1);this.setState({selectedWeek:e})}},{key:"nextWeek",value:function(){var e=D.m.offset(this.state.selectedWeek,1);this.setState({selectedWeek:e})}},{key:"linkToCategory",value:function(e,t){t.expenses.push(e),t.total=f.a.sumBy(t.expenses,"Amount"),this.forceUpdate()}},{key:"render",value:function(){var e=this,t=D.l("%d %B %Y")(this.state.selectedWeek),a=[];f.a.each(this.state.categories,(function(t){f.a.each(t.expenses,(function(n){D.m.floor(n.date).getTime()===e.state.selectedWeek.getTime()&&a.push({source:n,target:t})}))}));var n={linkToCategory:this.linkToCategory,links:a};return r.a.createElement("div",null,r.a.createElement("h2",null,r.a.createElement("span",{style:{cursor:"pointer"},onClick:this.prevWeek},"\u2190"),t,r.a.createElement("span",{style:{cursor:"pointer"},onClick:this.nextWeek},"\u2192")),r.a.createElement("svg",{width:900,height:1100},r.a.createElement(G,Object.assign({},n,this.state)),r.a.createElement(L,Object.assign({},n,this.state))))}}]),a}(n.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(Q,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},38:function(e){e.exports=JSON.parse('[{"Type":"Sale","Trans Date":"06/15/2017","Post Date":"06/15/2017","Description":"SFMTA MOSCONE GARAGE","Amount":-2},{"Type":"Sale","Trans Date":"06/15/2017","Post Date":"06/18/2017","Description":"SOCIAL POLICY","Amount":-13},{"Type":"Sale","Trans Date":"06/15/2017","Post Date":"06/18/2017","Description":"BLOCK 2 PARKING LOT","Amount":-10},{"Type":"Sale","Trans Date":"06/14/2017","Post Date":"06/16/2017","Description":"THE SANDWICH SHOP","Amount":-10.47},{"Type":"Sale","Trans Date":"06/13/2017","Post Date":"06/14/2017","Description":"SQ *TIGER TEA &amp; JUICE","Amount":-3.53},{"Type":"Payment","Trans Date":"06/12/2017","Post Date":"06/12/2017","Description":"Payment Thank You - Web","Amount":1122.14},{"Type":"Sale","Trans Date":"06/11/2017","Post Date":"06/12/2017","Description":"JAPAN CENTER GARAGE","Amount":-8.5},{"Type":"Sale","Trans Date":"06/11/2017","Post Date":"06/12/2017","Description":"SQ *BOBA GUYS FILLMORE","Amount":-15.5},{"Type":"Sale","Trans Date":"06/11/2017","Post Date":"06/13/2017","Description":"ON THE BRIDGE","Amount":-17.4},{"Type":"Sale","Trans Date":"06/11/2017","Post Date":"06/12/2017","Description":"SQ *CHATO","Amount":-13.29},{"Type":"Return","Trans Date":"06/11/2017","Post Date":"06/12/2017","Description":"SQ *BOBA GUYS FILLMORE","Amount":4},{"Type":"Sale","Trans Date":"06/10/2017","Post Date":"06/11/2017","Description":"CCSF MTA IPS PRKNG METER","Amount":-0.72},{"Type":"Sale","Trans Date":"06/10/2017","Post Date":"06/12/2017","Description":"PICCINO","Amount":-34.69},{"Type":"Sale","Trans Date":"06/10/2017","Post Date":"06/11/2017","Description":"SQ *AQUA CLUB","Amount":-14.03},{"Type":"Sale","Trans Date":"06/09/2017","Post Date":"06/12/2017","Description":"PICCINO","Amount":-58.7},{"Type":"Sale","Trans Date":"06/09/2017","Post Date":"06/11/2017","Description":"SFMTA MOSCONE GARAGE","Amount":-3},{"Type":"Sale","Trans Date":"06/09/2017","Post Date":"06/11/2017","Description":"SFMTA MOSCONE GARAGE","Amount":-6},{"Type":"Sale","Trans Date":"06/08/2017","Post Date":"06/08/2017","Description":"SFMTA MOSCONE GARAGE","Amount":-6},{"Type":"Sale","Trans Date":"06/08/2017","Post Date":"06/09/2017","Description":"SQ *TIGER TEA &amp; JUICE","Amount":-4.62},{"Type":"Sale","Trans Date":"06/08/2017","Post Date":"06/09/2017","Description":"SQ *TIGER TEA &amp; JUICE","Amount":-4.3},{"Type":"Sale","Trans Date":"06/07/2017","Post Date":"06/08/2017","Description":"THE SANDWICH SHOP","Amount":-10.47},{"Type":"Sale","Trans Date":"06/07/2017","Post Date":"06/08/2017","Description":"SQ *BOBA GUYS POTRERO","Amount":-15.45},{"Type":"Sale","Trans Date":"06/06/2017","Post Date":"06/06/2017","Description":"SFMTA MOSCONE GARAGE","Amount":-8},{"Type":"Sale","Trans Date":"06/05/2017","Post Date":"06/06/2017","Description":"SQ *ASHA TEA HOUSE (SF)","Amount":-8},{"Type":"Sale","Trans Date":"06/05/2017","Post Date":"06/07/2017","Description":"DELTA AIR   0062385896060","Amount":-130.2},{"Type":"Sale","Trans Date":"06/05/2017","Post Date":"06/07/2017","Description":"DELTA AIR   0062385896059","Amount":-130.2},{"Type":"Sale","Trans Date":"06/04/2017","Post Date":"06/06/2017","Description":"IKEA EAST PALO ALTO","Amount":-2.74},{"Type":"Sale","Trans Date":"06/04/2017","Post Date":"06/05/2017","Description":"THE REFUGE","Amount":-22.58},{"Type":"Sale","Trans Date":"06/04/2017","Post Date":"06/04/2017","Description":"SQ *CREOLA BISTRO","Amount":-32.77},{"Type":"Sale","Trans Date":"06/01/2017","Post Date":"06/02/2017","Description":"SANTA RAMEN","Amount":-15},{"Type":"Sale","Trans Date":"05/30/2017","Post Date":"05/31/2017","Description":"SQ *POKE LAB FISH BAR","Amount":-11.69},{"Type":"Sale","Trans Date":"05/30/2017","Post Date":"05/31/2017","Description":"SQ *TIGER TEA &amp; JUICE","Amount":-5.17},{"Type":"Sale","Trans Date":"05/30/2017","Post Date":"05/31/2017","Description":"SQ *TIGER TEA &amp; JUICE","Amount":-5.17},{"Type":"Sale","Trans Date":"05/30/2017","Post Date":"05/30/2017","Description":"GOOGLE *SVCSAPPS_00C23","Amount":-0.01},{"Type":"Sale","Trans Date":"05/29/2017","Post Date":"05/30/2017","Description":"ICICLES","Amount":-15},{"Type":"Sale","Trans Date":"05/28/2017","Post Date":"05/29/2017","Description":"SQ *BOBA GUYS POTRERO","Amount":-13.22},{"Type":"Sale","Trans Date":"05/28/2017","Post Date":"05/28/2017","Description":"SQ *TIGER TEA &amp; JUICE","Amount":-10.33},{"Type":"Sale","Trans Date":"05/27/2017","Post Date":"05/29/2017","Description":"Skool Restaurant","Amount":-84.35},{"Type":"Sale","Trans Date":"05/27/2017","Post Date":"05/29/2017","Description":"SFMTA MOSCONE GARAGE","Amount":-7},{"Type":"Sale","Trans Date":"05/26/2017","Post Date":"05/29/2017","Description":"FIREHOUSE NO 1","Amount":-57.26},{"Type":"Sale","Trans Date":"05/24/2017","Post Date":"05/25/2017","Description":"SQ *TIGER TEA &amp; JUICE","Amount":-4.62},{"Type":"Sale","Trans Date":"05/23/2017","Post Date":"05/23/2017","Description":"AIRBNB","Amount":-500},{"Type":"Sale","Trans Date":"05/23/2017","Post Date":"05/23/2017","Description":"AIRBNB","Amount":-367},{"Type":"Sale","Trans Date":"05/23/2017","Post Date":"05/25/2017","Description":"WETZEL\'S PRETZELS","Amount":-6.2},{"Type":"Sale","Trans Date":"05/23/2017","Post Date":"05/23/2017","Description":"SNOCREAM","Amount":-6.56},{"Type":"Sale","Trans Date":"05/22/2017","Post Date":"05/24/2017","Description":"AMTRAK .COM 1420627110785","Amount":-84},{"Type":"Sale","Trans Date":"05/21/2017","Post Date":"05/23/2017","Description":"FARMSTEAD","Amount":-38.28},{"Type":"Sale","Trans Date":"05/20/2017","Post Date":"05/21/2017","Description":"SQ *MISSION HEIRLOOM","Amount":-49.71},{"Type":"Sale","Trans Date":"05/20/2017","Post Date":"05/21/2017","Description":"MASSE\'S PASTRIES","Amount":-16.5},{"Type":"Sale","Trans Date":"05/20/2017","Post Date":"05/21/2017","Description":"SQ *CREATIVE NAIL SPA","Amount":-22},{"Type":"Sale","Trans Date":"05/19/2017","Post Date":"05/21/2017","Description":"SQ *TIGER TEA &amp; JUICE","Amount":-4.62}]')},97:function(e,t,a){e.exports=a(107)}},[[97,1,2]]]);
//# sourceMappingURL=main.f0cd1a7c.chunk.js.map