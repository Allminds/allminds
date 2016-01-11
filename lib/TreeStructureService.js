App.TreeStructureService = (function () {
  var instance;

  var init = function () {
      return {
        getTreeStructure : function(rootNode){
            return TreeStructure.find({rootNodeId : rootNode}).fetch();
        },
        createTreeStructure : function(treeStructureNode){
            var treeId = TreeStructure.insert(treeStructureNode);
            return treeId;
        },
        updateTreeStructure : function (id, updatedData) {
          var key = {_id: id};
          TreeStructure.update(key, {treeLayout: updatedData});
        }
      }
  };

  var createInstance = function () {
    var object = new init();
    return object;
  };

  return {
    getInstance : function () {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    }
  };
})();