module.exports = function replaceHtml(template, prod) {
  let output = template.replace("{{%Image%}}", prod.productImage);
  output = output.replace("{{%NAME%}}", prod.name);
  output = output.replace("{{%ModelName%}}", prod.modelName);
  output = output.replace("{{%Size%}}", prod.size);
  output = output.replace("{{%Camera%}}", prod.camera);
  output = output.replace("{{%ModelNo%}}", prod.modelNumber);
  output = output.replace("{{%Prices%}}", prod.price);
  output = output.replace("{{%Color%}}", prod.color);
  output = output.replace("{{%ID%}}", prod.id);
  output = output.replace("{{%ROM%}}", prod.ROM);
  output = output.replace("{{%DESC%}}", prod.Description);

  return output;
};

// module is a global obj of node.js
