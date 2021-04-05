exports.getHome = (req, res, next) => {
  const home = 'welcome to SSC API';

  return res.status(200).json({ status: 'success', data: home });
};
