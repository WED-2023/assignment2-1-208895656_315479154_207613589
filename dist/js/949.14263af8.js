"use strict";(self["webpackChunkassignment_2_1"]=self["webpackChunkassignment_2_1"]||[]).push([[949],{5949:(e,t,r)=>{r.r(t),r.d(t,{default:()=>ue});var s,n=function(){var e=this,t=e._self._c;return t("div",{staticClass:"search-page"},[t("div",{staticClass:"background-overlay"}),e._m(0),t("div",{staticClass:"search-bar-container"},[t("b-form",{staticClass:"search-bar-form",attrs:{inline:""},on:{submit:function(t){return t.preventDefault(),e.onSubmit.apply(null,arguments)}}},[t("b-input-group",{staticClass:"search-bar"},[t("b-form-input",{attrs:{placeholder:"Enter your search"},model:{value:e.searchQuery,callback:function(t){e.searchQuery=t},expression:"searchQuery"}}),t("b-input-group-append",[t("b-button",{attrs:{type:"submit",variant:"primary"}},[e._v("Search")])],1)],1)],1)],1),t("div",{staticClass:"category-buttons"},[t("b-button",{staticClass:"category-button",attrs:{variant:"outline-secondary"},on:{click:function(t){return e.setCategory("Vegetarian")}}},[e._v("Vegetarian")]),t("b-button",{staticClass:"category-button",attrs:{variant:"outline-secondary"},on:{click:function(t){return e.setCategory("Meat")}}},[e._v("Meat")]),t("b-button",{staticClass:"category-button",attrs:{variant:"outline-secondary"},on:{click:function(t){return e.setCategory("Gluten Free")}}},[e._v("Gluten Free")]),t("b-button",{staticClass:"category-button",attrs:{variant:"outline-secondary"},on:{click:function(t){return e.setCategory("Taco")}}},[e._v("Taco")])],1),t("div",{staticClass:"filters-container"},[t("b-form-group",{staticClass:"filter-item",attrs:{label:"Number of results:"}},[t("b-form-select",{staticClass:"form-control-white",attrs:{options:e.resultsOptions},model:{value:e.resultsCount,callback:function(t){e.resultsCount=t},expression:"resultsCount"}})],1),t("b-form-group",{staticClass:"filter-item",attrs:{label:"Sort by:"}},[t("b-form-select",{staticClass:"form-control-white",attrs:{options:e.sortOptions},model:{value:e.sortOption,callback:function(t){e.sortOption=t},expression:"sortOption"}})],1),t("b-form-group",{staticClass:"filter-item",attrs:{label:"Diets:"}},[t("b-dropdown",{staticClass:"m-2 custom-dropdown",attrs:{id:"diet-dropdown",text:"Select Diets",right:""},scopedSlots:e._u([{key:"button-content",fn:function(){return[e._v(" Select Diets ")]},proxy:!0}])},[t("b-dropdown-form",{staticClass:"dropdown-form"},[t("b-form-checkbox-group",{attrs:{options:e.dietOptions},model:{value:e.selectedDiets,callback:function(t){e.selectedDiets=t},expression:"selectedDiets"}})],1)],1)],1),t("b-form-group",{staticClass:"filter-item",attrs:{label:"Cuisines:"}},[t("b-dropdown",{staticClass:"m-2 custom-dropdown",attrs:{id:"cuisine-dropdown",text:"Select Cuisines",right:""},scopedSlots:e._u([{key:"button-content",fn:function(){return[e._v(" Select Cuisines ")]},proxy:!0}])},[t("b-dropdown-form",{staticClass:"dropdown-form"},[t("b-form-checkbox-group",{attrs:{options:e.cuisineOptions},model:{value:e.selectedCuisines,callback:function(t){e.selectedCuisines=t},expression:"selectedCuisines"}})],1)],1)],1),t("b-form-group",{staticClass:"filter-item",attrs:{label:"Intolerances:"}},[t("b-dropdown",{staticClass:"m-2 custom-dropdown",attrs:{id:"intolerance-dropdown",text:"Select Intolerances",right:""},scopedSlots:e._u([{key:"button-content",fn:function(){return[e._v(" Select Intolerances ")]},proxy:!0}])},[t("b-dropdown-form",{staticClass:"dropdown-form"},[t("b-form-checkbox-group",{attrs:{options:e.filterOptions},model:{value:e.selectedFilters,callback:function(t){e.selectedFilters=t},expression:"selectedFilters"}})],1)],1)],1)],1),t("div",{staticClass:"search-results"},[t("b-alert",{attrs:{variant:"warning",show:e.showNoQueryAlert,dismissible:""}},[e._v(" Please enter a search query. ")]),t("b-alert",{attrs:{variant:"danger",show:e.showNoResultsAlert,dismissible:""}},[e._v(" No recipes found. Please try a different search query or filters. ")]),e.recipes.length>0?t("div",{staticClass:"recipe-list"},e._l(e.recipes,(function(e){return t("div",{key:e.id},[t("RecipePreview",{attrs:{recipe:e}})],1)})),0):e._e()],1)])},a=[function(){var e=this,t=e._self._c;return t("header",{staticClass:"header"},[t("h1",{staticClass:"search-title"},[e._v("Search among "),t("span",{staticClass:"highlight"},[e._v("all")]),e._v(" our recipes")]),t("p",{staticClass:"search-subtitle"},[e._v("Find the best recipes for any occasion")])])}],i=r(124),o=r(8534),u=(r(2707),r(9600),r(8862),r(4909)),c=r(8298),l=r(7353),p=r(1317),d=r(2418),h=r(5193),v=r(8051),f=r(1915),b=r(4689),m=r(2299),x=r(7040),g=r(451),y=r(494),C=r(8735),w=r(3058),O=r(4602),k=r(9692),S=r(6298),j=(0,g.y2)(S.NQ,b.t_),P=(0,f.l7)({name:b.t_,mixins:[S.UG],inject:{getBvGroup:{from:"getBvRadioGroup",default:function(){return function(){return null}}}},props:j,computed:{bvGroup:function(){return this.getBvGroup()}}}),_=r(2023),D=r(8137),F=r(7330),G=r(9035),N=r(5505),A=r(3727),I=r(8280);function B(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);t&&(s=s.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,s)}return r}function E(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?B(Object(r),!0).forEach((function(t){R(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):B(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function R(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var Q,V=["aria-describedby","aria-labelledby"],M=(0,O.l)("checked"),Z=M.mixin,J=M.props,L=M.prop,T=M.event,U=(0,g.y2)((0,x.GE)(E(E(E(E(E(E(E(E({},A.N),J),_.N),F.N),G.N),N.N),D.N),{},{ariaInvalid:(0,g.pi)(m.gL,!1),buttonVariant:(0,g.pi)(m.N0),buttons:(0,g.pi)(m.U5,!1),stacked:(0,g.pi)(m.U5,!1),validated:(0,g.pi)(m.U5,!1)})),"formRadioCheckGroups"),W=(0,f.l7)({mixins:[A.t,Z,I.Z,_.X,F.f,G.j,N.J,D.i],inheritAttrs:!1,props:U,data:function(){return{localChecked:this[L]}},computed:{inline:function(){return!this.stacked},groupName:function(){return this.name||this.safeId()},groupClasses:function(){var e=this.inline,t=this.size,r=this.validated,s={"was-validated":r};return this.buttons&&(s=[s,"btn-group-toggle",R({"btn-group":e,"btn-group-vertical":!e},"btn-group-".concat(t),t)]),s}},watch:(s={},R(s,L,(function(e){(0,w.W)(e,this.localChecked)||(this.localChecked=e)})),R(s,"localChecked",(function(e,t){(0,w.W)(e,t)||this.$emit(T,e)})),s),render:function(e){var t=this,r=this.isRadioGroup,s=(0,x.ei)(this.$attrs,V),n=r?P:k.l,a=this.formOptions.map((function(r,a){var i="BV_option_".concat(a);return e(n,{props:{disabled:r.disabled||!1,id:t.safeId(i),value:r.value},attrs:s,key:i},[e("span",{domProps:(0,C.U)(r.html,r.text)})])}));return e("div",{class:[this.groupClasses,"bv-no-focus-ring"],attrs:E(E({},(0,x.CE)(this.$attrs,V)),{},{"aria-invalid":this.computedAriaInvalid,"aria-required":this.required?"true":null,id:this.safeId(),role:r?"radiogroup":"group",tabindex:"-1"})},[this.normalizeSlot(y.D$),a,this.normalizeSlot()])}});function K(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);t&&(s=s.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,s)}return r}function q(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?K(Object(r),!0).forEach((function(t){$(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):K(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function $(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var z=(0,g.y2)((0,x.GE)(q(q({},U),{},(Q={},$(Q,L,(0,g.pi)(m.aJ,[])),$(Q,"switches",(0,g.pi)(m.U5,!1)),Q))),b.xU),X=(0,f.l7)({name:b.xU,mixins:[W],provide:function(){var e=this;return{getBvCheckGroup:function(){return e}}},props:z,computed:{isRadioGroup:function(){return!1}}}),H=r(3106),Y=r(1642),ee=r(4424),te=r(4239),re=r(279),se=r(9239);const ne={components:{RecipePreview:te.Z,BForm:u.e,BFormGroup:c.x,BFormInput:l.e,BInputGroup:p.w,BInputGroupAppend:d.B,BButton:h.T,BFormSelect:v.K,BFormCheckboxGroup:X,BAlert:H.F,BDropdown:Y.R,BDropdownForm:ee.N},data:function(){return{recipes:[],searchQuery:"",resultsCount:5,resultsOptions:[{value:5,text:"5"},{value:10,text:"10"},{value:15,text:"15"}],selectedFilters:[],filterOptions:[{value:"Dairy",text:"Dairy"},{value:"Egg",text:"Egg"},{value:"Gluten",text:"Gluten"},{value:"Grain",text:"Grain"},{value:"Peanut",text:"Peanut"},{value:"Seafood",text:"Seafood"},{value:"Shellfish",text:"Shellfish"},{value:"Soy",text:"Soy"},{value:"Sulfite",text:"Sulfite"},{value:"Sesame",text:"Sesame"},{value:"Tree Nut",text:"Tree Nut"},{value:"Wheat",text:"Wheat"}],dietOptions:[{value:"Gluten Free",text:"Gluten Free"},{value:"Ketogenic",text:"Ketogenic"},{value:"Vegetarian",text:"Vegetarian"},{value:"Lacto-Vegetarian",text:"Lacto-Vegetarian"},{value:"Ovo-Vegetarian",text:"Ovo-Vegetarian"},{value:"Vegan",text:"Vegan"},{value:"Pescetarian",text:"Pescetarian"},{value:"Paleo",text:"Paleo"},{value:"Primal",text:"Primal"},{value:"Low FODMAP",text:"Low FODMAP"},{value:"Whole30",text:"Whole30"}],cuisineOptions:[{value:"African",text:"African"},{value:"Asian",text:"Asian"},{value:"American",text:"American"},{value:"British",text:"British"},{value:"Cajun",text:"Cajun"},{value:"Caribbean",text:"Caribbean"},{value:"Chinese",text:"Chinese"},{value:"Eastern European",text:"Eastern European"},{value:"European",text:"European"},{value:"French",text:"French"},{value:"German",text:"German"},{value:"Greek",text:"Greek"},{value:"Indian",text:"Indian"},{value:"Irish",text:"Irish"},{value:"Italian",text:"Italian"},{value:"Japanese",text:"Japanese"},{value:"Jewish",text:"Jewish"},{value:"Korean",text:"Korean"},{value:"Latin American",text:"Latin American"},{value:"Mediterranean",text:"Mediterranean"},{value:"Mexican",text:"Mexican"},{value:"Middle Eastern",text:"Middle Eastern"},{value:"Nordic",text:"Nordic"},{value:"Southern",text:"Southern"},{value:"Spanish",text:"Spanish"},{value:"Thai",text:"Thai"},{value:"Vietnamese",text:"Vietnamese"}],selectedDiets:[],selectedCuisines:[],sortOption:"likes",sortOptions:[{value:"likes",text:"Likes"},{value:"preparation_time",text:"Preparation Time"}],showNoQueryAlert:!1,showNoResultsAlert:!1,user:null}},watch:{sortOption:function(){this.sortRecipes()}},methods:{sortRecipes:function(){var e=this;this.recipes&&0!==this.recipes.length&&this.recipes.sort((function(t,r){switch(e.sortOption){case"likes":return r.popularity-t.popularity;case"preparation_time":return t.readyInMinutes-r.readyInMinutes;default:return 0}}))},fetchRecipes:function(){var e=this;return(0,o.Z)((0,i.Z)().mark((function t(){var r;return(0,i.Z)().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,(0,re.yC)(e.searchQuery,e.selectedCuisines.join(", "),e.selectedDiets.join(", "),e.selectedFilters.join(", "),e.resultsCount);case 2:return r=t.sent,r&&r.data&&(e.recipes=r.data,e.sortRecipes()),t.abrupt("return",r);case 5:case"end":return t.stop()}}),t)})))()},onSubmit:function(){var e=this;return(0,o.Z)((0,i.Z)().mark((function t(){var r,s;return(0,i.Z)().wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.showNoQueryAlert=!1,e.showNoResultsAlert=!1,e.searchQuery){t.next=6;break}return e.showNoQueryAlert=!0,e.recipes=[],t.abrupt("return");case 6:return t.prev=6,t.next=9,e.fetchRecipes();case 9:r=t.sent,e.recipes=r.data,e.showNoResultsAlert=0===e.recipes.length,s={searchQuery:e.searchQuery,resultsCount:e.resultsCount,selectedFilters:e.selectedFilters,selectedDiets:e.selectedDiets,selectedCuisines:e.selectedCuisines,sortOption:e.sortOption},sessionStorage.setItem("lastSearch",JSON.stringify(s)),t.next=21;break;case 16:t.prev=16,t.t0=t["catch"](6),console.error("Failed to fetch recipes:",t.t0),e.recipes=[],e.showNoResultsAlert=!0;case 21:case"end":return t.stop()}}),t,null,[[6,16]])})))()},setCategory:function(e){this.searchQuery=e,this.onSubmit()}},mounted:function(){var e=this;return(0,o.Z)((0,i.Z)().mark((function t(){var r,s,n;return(0,i.Z)().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,(0,se.ts)();case 3:r=t.sent,e.user=r,e.user&&(s=sessionStorage.getItem("lastSearch"),s&&(n=JSON.parse(s),e.searchQuery=n.searchQuery,e.resultsCount=n.resultsCount,e.selectedFilters=n.selectedFilters,e.selectedDiets=n.selectedDiets,e.selectedCuisines=n.selectedCuisines,e.sortOption=n.sortOption,e.onSubmit())),t.next=11;break;case 8:t.prev=8,t.t0=t["catch"](0),console.error("Failed to get current user:",t.t0);case 11:case"end":return t.stop()}}),t,null,[[0,8]])})))()}},ae=ne;var ie=r(1001),oe=(0,ie.Z)(ae,n,a,!1,null,"45fe91ac",null);const ue=oe.exports},9600:(e,t,r)=>{var s=r(2109),n=r(1702),a=r(8361),i=r(5656),o=r(9341),u=n([].join),c=a!=Object,l=c||!o("join",",");s({target:"Array",proto:!0,forced:l},{join:function(e){return u(i(this),void 0===e?",":e)}})}}]);
//# sourceMappingURL=949.14263af8.js.map