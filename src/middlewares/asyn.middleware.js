export const asyncMiddleware = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(err => {
      // 특정 에러 메시지에 대한 처리
      if (err.message.includes("Cast to ObjectId failed")) {
        res.status(500).json({ errorMessage: '서버 오류' });
      } else {
        // 일반 에러 메시지 처리
        res.status(500).json({ errorMessage: err.message || '서버 오류' });
      }
    });
  };
  
  
  export default asyncMiddleware;
  