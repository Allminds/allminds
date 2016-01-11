var mindMapService = App.MindMapService.getInstance();

var nodeSelector = {
  prevDepthVisited: 0,

  setPrevDepth: function (depth) {
    this.prevDepthVisited = depth;
  }
};

var update = function (data) {
  window.data = data;

  d3.select('#mindmap svg')
    .datum(data)
    .call(App.chart);
  App.chart.update();
  App.getChartInFocus();
};

var enableHelpLink = function () {
  $('#help-modal').modal('show');
};

  var treeTraverse = function(node){
    var currNodeDetails = App.MindMapService.getInstance().getNodeDetails(node.id);
    node.position = currNodeDetails[0].position;
    node.name = currNodeDetails[0].name;
    if(node.children.length === 0){
      return node;
    }
    for (var i = 0; i < node.children.length; i++){
      treeTraverse(node.children[i]);
    }
    return node;
  };

Template.create.rendered = function rendered() {

  createTreeLayout(this.data.id);

//  var tree = mindMapService.buildTree(this.data.id, this.data.data);
//  update(tree);
  var rootNode = d3.selectAll('.node')[0].find(function (node) {
    return !node.__data__.position;
  });

  App.select(rootNode);
  Mindmaps.find().observeChanges(App.tracker);

  App.retainCollapsed();
  d3.select("#help-link").on('click', enableHelpLink);

  App.setMapsCount();
};

var createTreeLayout = function(rootNodeId){
  treeNode = App.TreeStructureService.getInstance().getTreeStructure(rootNodeId);
  if(treeNode.length === 0){
    var treeRootNode = new App.TreeStructureDTO(rootNodeId, null);
//    var treeStructureId = App.TreeStructureService.getInstance().createTreeStructure(treeRootNode);
//    treeNode = App.TreeStructureService.getInstance().getTreeStructure(rootNodeId);
//    var treeRoot = new App.TreeNode(treeRootNode.rootNodeId, 'New Mindmap', null, null);
//    treeNode[0].treeLayout.root = treeRoot;
      treeNode.push(treeRootNode);
  }
  treeStructureData = treeTraverse(treeNode[0].treeLayout.root);
  var retNode = App.findNodeObjectInTree("YrjMK4LyagCC7wWEr", treeNode[0].treeLayout.root);
  update(treeStructureData);
};



