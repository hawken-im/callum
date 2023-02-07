module.exports = (item) => {
  const { type, object, result } = item.Data;
  if (type === 'Create' && object.type === 'Note' && !object.inreplyto && !object.insolto) {
    return 'project';
  }
  if (type === 'Create' && object.type === 'Note' && object.insolto) {
    return 'solution';
  }
  if (type === 'Create' && object.type === 'Note' && object.inreplyto) {
    return 'comment';
  }
  if (type === 'Vote' || type === 'Unvote') {
    return 'vote';
  }
  if (type === 'Like' || type === 'Dislike') {
    return 'like';
  }
  if (type === 'Create' && object.type === 'Person') {
    return 'profile';
  }
  if (type === 'Delete' && object.type === 'Note') {
    return 'delete';
  }
  if (type === 'Update' && object.type === 'Note' && result?.type === 'Note') {
    return 'edit';
  }
};