import { render, screen, fireEvent } from '@testing-library/react'
import { useSession, signIn } from 'next-auth/client'
import { useRouter } from 'next/dist/client/router'
import { SubscribeButton } from '.'

jest.mock('next-auth/client')
jest.mock('next/dist/client/router')

describe('SubscribeButton component', () => {
  it('renders correctly', () => {
    const useSessionMocked = jest.mocked(useSession)
    useSessionMocked.mockReturnValueOnce([null, false])

    render(
      <SubscribeButton />
    )

    expect(screen.getByText('Subscribe now')).toBeInTheDocument()
  })

  it('redirects user to sign in when not authenticated', () => {
    const useSessionMocked = jest.mocked(useSession)
    useSessionMocked.mockReturnValueOnce([null, false])
    const signInMocked = jest.mocked(signIn)

    render(
      <SubscribeButton />
    )
    const subscribeButton = screen.getByText('Subscribe now')
    fireEvent.click(subscribeButton)

    expect(signInMocked).toHaveBeenCalled()
  })

  it('redirects to posts when user already has a subscription', () => {
    const useSessionMocked = jest.mocked(useSession)
    useSessionMocked.mockReturnValueOnce([
      { activeSubscription: 'fake-active-subscription' },
      false
    ])
    const useRouterMocked = jest.mocked(useRouter)
    const pushMock = jest.fn()
    useRouterMocked.mockReturnValueOnce({
      'push': pushMock
    } as any)

    render(
      <SubscribeButton />
    )
    const subscribeButton = screen.getByText('Subscribe now')
    fireEvent.click(subscribeButton)

    expect(pushMock).toHaveBeenCalledWith('/posts')
  })
})