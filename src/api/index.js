const axios = require('axios');
const LoginData = require('./tempdata/loginData.js');
const CompetitiveData = require('./tempdata/competitiveData.js');
const CollectionData = require('./tempdata/collectionData.js');
const MediaData = require('./tempdata/mediaData.js');
const SearchData = require('./tempdata/searchData.js');
const TableData = require('./tempdata/tableData.js');
const DoCollectionData = require('./tempdata/docollectionData.js');
const GetReportListData = require('./tempdata/getReportListData.js');
const AddReportListData = require('./tempdata/addReportListData.js');
const ChangeReportListData = require('./tempdata/changeReportListData.js');
const EditReportData = require('./tempdata/editReportData.js');
const SaveReportData = require('./tempdata/saveReportData.js');
const ReportListData = require('./tempdata/reportListData.js');
const RemoveReportListData = require('./tempdata/removeReportListData.js');

module.exports = {
	LoginData,
	CompetitiveData,
	CollectionData,
	MediaData,
	SearchData,
	TableData,
	DoCollectionData,
	GetReportListData,
	AddReportListData,
	ChangeReportListData,
	EditReportData,
	SaveReportData,
	ReportListData,
	RemoveReportListData
}