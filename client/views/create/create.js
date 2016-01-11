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
    console.log(node.id);
    var currNodeDetails = App.MindMapService.getInstance().getNodeDetails(node.id);
    node.position = currNodeDetails[0].position;
    node.name = currNodeDetails[0].name;
    if(node.children.length === 0){
      return;
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
  var treeNode = App.TreeStructureService.getInstance().getTreeStructure(rootNodeId);
  var treeData = treeTraverse(treeNode[0].treeLayout.root);
  update(treeData);
};



