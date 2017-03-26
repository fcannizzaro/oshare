const space = "                                                           ";

var identify = (key, value, level, path) => {

  var code = "";

  if (typeof value == 'string') {
    if (value == "$function") {
      code += indent(level + 1) + `public static void ${key}(Object ... args) {`;
      code += indent(level + 2) + `Oshare.invoke("${path}", args);`;
      code += indent(level + 1) + `}`;
    } else {
      code += indent(level + 1) + `public static String ${key};`;
    }
  } else if (typeof value == 'number') {

    if (value % 1) {
      code += indent(level + 1) + `public static double ${key};`;
    } else {
      code += indent(level + 1) + `public static int ${key};`;
    }
  } else if (typeof value == 'boolean') {
    code += indent(level + 1) + `public static boolean ${key};`;
  } else if (typeof value == 'object') {
    code += indent(level + 1).slice(1) + generate(key, value, level + 1, path);
  }

  return code;

}

var indent = (level) => (level > 0 ? "\n" : "") + space.slice(0, level * 2);

var generate = (name, obj, level, path) => {
  var code = indent(level) + `public static class ${name} {`;
  for (let key in obj) {
    code += indent(level + 1).slice(1) + identify(key, obj[key], level + 1, path + "." + key);
  }
  return code + indent(level) + `}`;
}

exports.generate = (shared) => {
  var code = 'import com.fcannizzaro.oshare.Oshare;\n\n';
  code += '/**\n * Generated by Oshare (https://github.com/fcannizzaro/oshare)\n';
  code += ' * @author Francesco Cannizzaro (fcannizzaro)\n';
  code += ' * @version 1.0.2\n';
  code += ' */\n';
  code += 'public class Remote {';
  for (let key in shared) {
    code += identify(key, shared[key], 0, key);
  }
  code += '\n}';
  return code;
}