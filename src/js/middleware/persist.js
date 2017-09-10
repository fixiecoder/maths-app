export default store => next => action => {
  next(action);
  switch(action.type) {
    default:
      // const practiceHistory = JSON.stringify(store.getState().getIn(['questions', 'practiceHistory']).toJS())
      // const challengeHistory = JSON.stringify(store.getState().getIn(['questions', 'challengeHistory']).toJS())
      // localStorage.setItem('practice-history', practiceHistory);
      // localStorage.setItem('challenge-history', challengeHistory);


      localStorage.setItem('state', JSON.stringify(store.getState().toJS()));
  }
}