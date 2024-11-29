const ThreadRepository = require('../../../Domains/threads/ThreadRepository')
const AddedThread = require('../../../Domains/threads/entities/AddedThread')
const NewThread = require('../../../Domains/threads/entities/NewThread')
const AddThreadUseCase = require('../AddThreadUseCase')

describe('AddThreadUseCase', () => {
  it('should orchestrating the add thread action correctly', async () => {
    // Arrange
    const useCasePayload = {
      title: 'dicoding',
      body: 'body thread'
    }
    const useCaseAuth = {
      id: 'user-123'
    }

    const mockAddedThread = new AddedThread({
      id: 'thread-123',
      title: useCasePayload.title,
      owner: useCaseAuth.id
    })

    const mockThreadRepository = new ThreadRepository()

    // mockThreadRepository.addThread = jest.fn()
    //   .mockImplementation(() => Promise.resolve(mockAddedThread))
    mockThreadRepository.addThread = jest.fn(() => Promise.resolve(mockAddedThread));

    const getThreadUseCase = new AddThreadUseCase({
      threadRepository: mockThreadRepository
    })

    // Action
    const addedThread = await getThreadUseCase.execute(useCasePayload, useCaseAuth)

    // Assert
    expect(addedThread).toStrictEqual(new AddedThread({
      id: 'thread-123',
      title: useCasePayload.title,
      owner: useCaseAuth.id
    }))

    expect(mockThreadRepository.addThread).toBeCalledWith(new NewThread({
      title: useCasePayload.title,
      body: useCasePayload.body
    }), useCaseAuth.id)
  })
})