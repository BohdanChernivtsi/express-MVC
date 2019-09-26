exports.helper = item => {
    if (!item) this.throw(404, 'invalid todo id');
}