describe('WhatsNext.Routes', function() {
  
  it('redirects "/" to "/todos"', function() {
    spyOn(WhatsNext, 'redirect');
    WhatsNext.route('/');
    expect(WhatsNext.redirect).toHaveBeenCalledWith('/todos');
  });
  
});