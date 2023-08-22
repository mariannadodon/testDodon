var chakram = require('./node_modules/chakram/lib/chakram.js'),
  expect = chakram.expect;

let extIP = require("ext-ip")();

function externalIp() {
  extIP.get().then(ip => {
    console.log(ip);
  }, err => {
    console.error(err);
  });
  return extIP;
};


describe("compare the local IP address and the received address with https://httpbin.org/ip", function () {
  this.timeout(120000);

  it("checking the data", async () => {

    var response = chakram.get("https://httpbin.org/ip");
    expect(response).to.have.status(200);
    expect(response).to.have.header("content-type", "application/json");
    expect(response).not.to.be.encoded.with.gzip;
    expect(response).to.comprise.of.json({
      origin: externalIp()
    });
    return chakram.wait();
  });
});



