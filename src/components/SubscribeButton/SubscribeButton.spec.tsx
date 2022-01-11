import { render, screen, fireEvent } from '@testing-library/react'
import { useSession, signIn } from 'next-auth/client'
import { useRouter } from 'next/dist/client/router'
import { SubscribeButton } from '.'

jest.mock('next-auth/client')
jest.mock('next/dist/client/router')

describe('SubscribeButton component', () => {
  it('renders correctly', () => {
    const useSessionMocked = useSession as jest.Mock
    useSessionMocked.mockReturnValueOnce([null, false])

    render(
      <SubscribeButton />
    )

    expect(screen.getByText('Subscribe now')).toBeInTheDocument()
  })

  it('redirects user to sign in when not authenticated', () => {
    const useSessionMocked = useSession as jest.Mock
    useSessionMocked.mockReturnValueOnce([null, false])
    const signInMocked = signIn as jest.Mock

    render(
      <SubscribeButton />
    )
    const subscribeButton = screen.getByText('Subscribe now')
    fireEvent.click(subscribeButton)

    expect(signInMocked).toHaveBeenCalled()
  })

  it('redirects to posts when user already has a subscription', () => {
    const useSessionMocked = useSession as jest.Mock
    useSessionMocked.mockReturnValueOnce([
      { activeSubscription: 'fake-active-subscription' },
      false
    ])
    const useRouterMocked = useRouter as jest.Mock
    const pushMock = jest.fn()
    useRouterMocked.mockReturnValueOnce({
      push: pushMock
    })

    render(
      <SubscribeButton />
    )
    const subscribeButton = screen.getByText('Subscribe now')
    fireEvent.click(subscribeButton)

    expect(pushMock).toHaveBeenCalledWith('/posts')
  })
})