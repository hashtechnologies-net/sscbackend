exports.getHome = (req, res, next) => {
  const home =
    'Welcome to SSC API, This is an API for Health Wealth Card Mobile Application';

  return res.status(200).json({ status: 'success', data: home });
};
