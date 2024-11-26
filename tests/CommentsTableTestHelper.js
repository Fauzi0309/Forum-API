const pool = require('../src/Infrastructures/database/postgres/pool')

const CommentsTableTestHelper = {
  async addComment ({ id = 'comment-123', content = 'content comment' }, userId = 'user-123', threadId = 'thread-123') {
    const date = new Date()
    const query = {
      text: 'INSERT INTO comments VALUES($1,$2,$3,$4,$5,$6)',
      values: [id, content, date, userId, threadId, false]
    }

    await pool.query(query)
  },

  async findCommentsById (id) {
    const query = {
      text: 'SELECT * FROM comments WHERE id = $1',
      values: [id]
    }

    const result = await pool.query(query)
    return result.rows
  },

  async cleanTable () {
    await pool.query('DELETE FROM comments WHERE 1=1')
  }
}
module.exports = CommentsTableTestHelper