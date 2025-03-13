"use strict";(self.webpackChunk_netcracker_qubership_apihub_apispec_view=self.webpackChunk_netcracker_qubership_apihub_apispec_view||[]).push([[727],{"./src/web-components/__stories__/helpers/compatibility-suite-utils.tsx":(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.StoryComponent=StoryComponent,exports.getStoryArgs=function getStoryArgs(suiteType,suitId,testId){const[before,after]=(0,_qubershipApihubCompatibilitySuites.getCompatibilitySuite)(suiteType,suitId,testId);return{before,after}};var _qubershipApihubApiDiff=__webpack_require__("../../node_modules/@netcracker/qubership-apihub-api-diff/dist/index.cjs.js"),_qubershipApihubApiUnifier=__webpack_require__("../../node_modules/@netcracker/qubership-apihub-api-unifier/dist/index.cjs.js"),_qubershipApihubCompatibilitySuites=__webpack_require__("../../node_modules/@netcracker/qubership-apihub-compatibility-suites/dist/index.cjs.js"),_DiffOperationAPI=__webpack_require__("./src/containers/DiffOperationAPI.tsx"),_getMergedDocument=__webpack_require__("./src/web-components/__stories__/helpers/getMergedDocument.ts"),_yaml=__webpack_require__("../../node_modules/@stoplight/yaml/index.js"),_diffBlock=__webpack_require__("../diff-block/src/index.ts"),_fontfaceobserver=function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}(__webpack_require__("../../node_modules/fontfaceobserver/fontfaceobserver.standalone.js")),_lodash=__webpack_require__("../../node_modules/lodash/lodash.js"),_react=function _interopRequireWildcard(e,r){if(!r&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=_getRequireWildcardCache(r);if(t&&t.has(e))return t.get(e);var n={__proto__:null},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var u in e)if("default"!==u&&{}.hasOwnProperty.call(e,u)){var i=a?Object.getOwnPropertyDescriptor(e,u):null;i&&(i.get||i.set)?Object.defineProperty(n,u,i):n[u]=e[u]}return n.default=e,t&&t.set(e,n),n}(__webpack_require__("../../node_modules/react/index.js"));function _getRequireWildcardCache(e){if("function"!=typeof WeakMap)return null;var r=new WeakMap,t=new WeakMap;return(_getRequireWildcardCache=function(e){return e?t:r})(e)}const FONT_FAMILIES=["Inter"];function StoryComponent({before,after}){const{diffs,merged}=(0,_getMergedDocument.getCompareResult)((0,_yaml.parse)(before),(0,_yaml.parse)(after)),[fontLoaded,setFontLoaded]=(0,_react.useState)(!1),promises=FONT_FAMILIES.map((fontFamily=>new _fontfaceobserver.default(fontFamily).load(null,1e4)));return Promise.all(promises).then((()=>{setFontLoaded(!0)})),console.log((0,_qubershipApihubApiUnifier.stringifyCyclicJso)(diffs.map((diff=>{if((0,_qubershipApihubApiDiff.isDiffAdd)(diff)){const{afterDeclarationPaths=[],...rest}=diff;return{...rest,...(0,_lodash.isEmpty)(afterDeclarationPaths)?{}:{afterDeclarationPaths:`[${afterDeclarationPaths.map((path=>`[${path.join()}]`)).join()}]`}}}if((0,_qubershipApihubApiDiff.isDiffRemove)(diff)){const{beforeDeclarationPaths=[],...rest}=diff;return{...rest,...(0,_lodash.isEmpty)(beforeDeclarationPaths)?{}:{beforeDeclarationPaths:`[${beforeDeclarationPaths.map((path=>`[${path.join()}]`)).join()}]`}}}if((0,_qubershipApihubApiDiff.isDiffReplace)(diff)||(0,_qubershipApihubApiDiff.isDiffRename)(diff)){const{beforeDeclarationPaths=[],afterDeclarationPaths=[],...rest}=diff;return{...rest,...(0,_lodash.isEmpty)(beforeDeclarationPaths)?{}:{beforeDeclarationPaths:`[${beforeDeclarationPaths.map((path=>`[${path.join()}]`)).join()}]`},...(0,_lodash.isEmpty)(afterDeclarationPaths)?{}:{afterDeclarationPaths:`[${afterDeclarationPaths.map((path=>`[${path.join()}]`)).join()}]`}}}return null})))),fontLoaded?_react.default.createElement(_DiffOperationAPI.DiffOperationAPI,{mergedDocument:merged,filters:[],diffMetaKey:_diffBlock.diffMetaKey}):_react.default.createElement(_react.default.Fragment,null)}try{StoryComponent.displayName="StoryComponent",StoryComponent.__docgenInfo={description:"",displayName:"StoryComponent",props:{before:{defaultValue:null,description:"",name:"before",required:!0,type:{name:"string"}},after:{defaultValue:null,description:"",name:"after",required:!0,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/web-components/__stories__/helpers/compatibility-suite-utils.tsx#StoryComponent"]={docgenInfo:StoryComponent.__docgenInfo,name:"StoryComponent",path:"src/web-components/__stories__/helpers/compatibility-suite-utils.tsx#StoryComponent"})}catch(__react_docgen_typescript_loader_error){}},"./src/web-components/__stories__/helpers/getMergedDocument.ts":(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.getCompareResult=void 0,exports.getCopyWithEmptyPaths=function getCopyWithEmptyPaths(document){const{paths,...rest}=document;return rest.paths={},rest},exports.getMergedDocument=void 0,exports.normalizeOpenApiDocument=normalizeOpenApiDocument,exports.removeComponents=removeComponents;var _qubershipApihubApiUnifier=__webpack_require__("../../node_modules/@netcracker/qubership-apihub-api-unifier/dist/index.cjs.js"),_qubershipApihubApiDiff=__webpack_require__("../../node_modules/@netcracker/qubership-apihub-api-diff/dist/index.cjs.js"),_json=__webpack_require__("../../node_modules/@stoplight/json/index.es.js"),_diffBlock=__webpack_require__("../diff-block/src/index.ts");const NORMALIZE_OPTIONS={validate:!0,liftCombiners:!0,syntheticTitleFlag:Symbol("synthetic-title"),unify:!0,allowNotValidSyntheticChanges:!0};exports.getMergedDocument=(before,after)=>!before&&after?normalizeOpenApiDocument(removeComponents(after),after):before&&!after?normalizeOpenApiDocument(removeComponents(before),before):before&&after?getCompareResult(before,after).merged:null;const getCompareResult=(before,after)=>{const beforeOperation=removeComponents(before),afterOperation=removeComponents(after),compareResult=(0,_qubershipApihubApiDiff.apiDiff)(beforeOperation,afterOperation,{...NORMALIZE_OPTIONS,beforeSource:before,afterSource:after,mode:_qubershipApihubApiDiff.COMPARE_MODE_OPERATION,metaKey:_diffBlock.diffMetaKey,onRefResolveError:(message,path,ref)=>{console.debug(["[ASV] [Ref Resolve Error]",`Message: ${message}`,`JSON path: ${path}`,`Ref: ${ref}`].join("\n"))},onMergeError:(message,path,values)=>{console.debug(["[ASV] [Merge Error]",`Message: ${message}`,`JSON path: ${path}`,`Values: ${(0,_json.safeStringify)(values)}`].join("\n"))},onUnifyError:(message,path,value,cause)=>{console.debug(["[ASV] [Unify Error]",`Message: ${message}`,`JSON path: ${path}`,`Values: ${(0,_json.safeStringify)(value)}`,`Cause: ${cause}`].join("\n"))},onValidateError:(message,path,value,cause)=>{console.debug(["[ASV] [Validate Error]",`Message: ${message}`,`JSON path: ${path}`,`Values: ${(0,_json.safeStringify)(value)}`,`Cause: ${cause}`].join("\n"))}});return isObject(compareResult.merged)&&(compareResult.merged.toJSON=()=>(0,_qubershipApihubApiUnifier.stringifyCyclicJso)(compareResult.merged)),compareResult};function removeComponents(source){if(source&&"components"in source){const{components,...rest}=source;return isObject(components)&&"securitySchemes"in components?{...rest,components:{securitySchemes:components.securitySchemes}}:rest}return source}function normalizeOpenApiDocument(operation,source){const normalizedSource=(0,_qubershipApihubApiUnifier.normalize)(operation,{source,...NORMALIZE_OPTIONS}),mergedSource=(0,_qubershipApihubApiUnifier.denormalize)(normalizedSource,NORMALIZE_OPTIONS);return isObject(mergedSource)&&(mergedSource.toJSON=()=>(0,_qubershipApihubApiUnifier.stringifyCyclicJso)(mergedSource)),mergedSource}function isObject(maybeObject){return null!=maybeObject&&"object"==typeof maybeObject}exports.getCompareResult=getCompareResult},"./src/web-components/__stories__/compatibility-suite/request.generated.stories.tsx":(module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=exports.UpdateRequestBodyDescription=exports.UpdateMediaTypeOfRequestBody=exports.UpdateExampleOfRequestBody=exports.RemoveRequestBodyDescription=exports.RemoveExampleOfRequestBody=exports.MarkRequestBodyAsRequiredOption2=exports.MarkRequestBodyAsRequiredOption1=exports.MarkRequestBodyAsOptionalOption2=exports.MarkRequestBodyAsOptionalOption1=exports.AddRequestBodyDescription=exports.AddExampleOfRequestBody=void 0,__webpack_require__("./src/web-components/index.ts");var _compatibilitySuiteUtils=__webpack_require__("./src/web-components/__stories__/helpers/compatibility-suite-utils.tsx"),_qubershipApihubCompatibilitySuites=__webpack_require__("../../node_modules/@netcracker/qubership-apihub-compatibility-suites/dist/index.cjs.js");exports.default={title:"openapi-compatibility-suite/request"};exports.AddExampleOfRequestBody={name:"add-example-of-request-body",render:_compatibilitySuiteUtils.StoryComponent,args:(0,_compatibilitySuiteUtils.getStoryArgs)(_qubershipApihubCompatibilitySuites.TEST_SPEC_TYPE_OPEN_API,"request","add-example-of-request-body")},exports.AddRequestBodyDescription={name:"add-request-body-description",render:_compatibilitySuiteUtils.StoryComponent,args:(0,_compatibilitySuiteUtils.getStoryArgs)(_qubershipApihubCompatibilitySuites.TEST_SPEC_TYPE_OPEN_API,"request","add-request-body-description")},exports.MarkRequestBodyAsOptionalOption1={name:"mark-request-body-as-optional-option-1",render:_compatibilitySuiteUtils.StoryComponent,args:(0,_compatibilitySuiteUtils.getStoryArgs)(_qubershipApihubCompatibilitySuites.TEST_SPEC_TYPE_OPEN_API,"request","mark-request-body-as-optional-option-1")},exports.MarkRequestBodyAsOptionalOption2={name:"mark-request-body-as-optional-option-2",render:_compatibilitySuiteUtils.StoryComponent,args:(0,_compatibilitySuiteUtils.getStoryArgs)(_qubershipApihubCompatibilitySuites.TEST_SPEC_TYPE_OPEN_API,"request","mark-request-body-as-optional-option-2")},exports.MarkRequestBodyAsRequiredOption1={name:"mark-request-body-as-required-option-1",render:_compatibilitySuiteUtils.StoryComponent,args:(0,_compatibilitySuiteUtils.getStoryArgs)(_qubershipApihubCompatibilitySuites.TEST_SPEC_TYPE_OPEN_API,"request","mark-request-body-as-required-option-1")},exports.MarkRequestBodyAsRequiredOption2={name:"mark-request-body-as-required-option-2",render:_compatibilitySuiteUtils.StoryComponent,args:(0,_compatibilitySuiteUtils.getStoryArgs)(_qubershipApihubCompatibilitySuites.TEST_SPEC_TYPE_OPEN_API,"request","mark-request-body-as-required-option-2")},exports.RemoveExampleOfRequestBody={name:"remove-example-of-request-body",render:_compatibilitySuiteUtils.StoryComponent,args:(0,_compatibilitySuiteUtils.getStoryArgs)(_qubershipApihubCompatibilitySuites.TEST_SPEC_TYPE_OPEN_API,"request","remove-example-of-request-body")},exports.RemoveRequestBodyDescription={name:"remove-request-body-description",render:_compatibilitySuiteUtils.StoryComponent,args:(0,_compatibilitySuiteUtils.getStoryArgs)(_qubershipApihubCompatibilitySuites.TEST_SPEC_TYPE_OPEN_API,"request","remove-request-body-description")},exports.UpdateExampleOfRequestBody={name:"update-example-of-request-body",render:_compatibilitySuiteUtils.StoryComponent,args:(0,_compatibilitySuiteUtils.getStoryArgs)(_qubershipApihubCompatibilitySuites.TEST_SPEC_TYPE_OPEN_API,"request","update-example-of-request-body")},exports.UpdateMediaTypeOfRequestBody={name:"update-media-type-of-request-body",render:_compatibilitySuiteUtils.StoryComponent,args:(0,_compatibilitySuiteUtils.getStoryArgs)(_qubershipApihubCompatibilitySuites.TEST_SPEC_TYPE_OPEN_API,"request","update-media-type-of-request-body")},exports.UpdateRequestBodyDescription={name:"update-request-body-description",render:_compatibilitySuiteUtils.StoryComponent,args:(0,_compatibilitySuiteUtils.getStoryArgs)(_qubershipApihubCompatibilitySuites.TEST_SPEC_TYPE_OPEN_API,"request","update-request-body-description")};module.exports.__namedExportsOrder=["UpdateRequestBodyDescription","UpdateMediaTypeOfRequestBody","UpdateExampleOfRequestBody","RemoveRequestBodyDescription","RemoveExampleOfRequestBody","MarkRequestBodyAsRequiredOption2","MarkRequestBodyAsRequiredOption1","MarkRequestBodyAsOptionalOption2","MarkRequestBodyAsOptionalOption1","AddRequestBodyDescription","AddExampleOfRequestBody"]}}]);