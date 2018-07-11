const path = require("path");
const stylelint = require("stylelint");

describe("Shareable configuration", () => {
  it("loads the plugin and configures it to target only single classes or ids", () => {
    const config = {
      extends: path.join(__dirname, "../config")
    };

    const accepted = [`.a .b { prop: value; }`, `el {prop: value;}`].map(
      code => {
        return stylelint
          .lint({
            code,
            config
          })
          .then(output => {
            expect(output.results[0].warnings).toEqual([]);
          });
      }
    );
    const rejected = [`.a { prop: value; }`, `#i {prop: value;}`].map(code => {
      return stylelint
        .lint({
          code,
          config
        })
        .then(output => {
          expect(output.results[0].warnings.length).toBeGreaterThanOrEqual(1);
        });
    });

    return Promise.all(accepted.concat(rejected));
  });
});
