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
        updateTreeStructure : function (id, $set) {
          var key = {_id: id};
          TreeStructure.update(key, {$set: $set});
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