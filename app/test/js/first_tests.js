describe('First Test', function () {
  it('always succeeds', function () {
    const expected = true;

    (true).should.equal(expected);
  });

  it('always fails', function () {
    const expected = true;

    (false).should.equal(expected);
  });
});
