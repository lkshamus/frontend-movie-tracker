import React from 'react';
import { shallow } from 'enzyme';
import { connect } from 'react-redux';
import * as userDatabaseFetch from '../../utilities/userDatabaseFetch';

import { SignUpForm, mapDispatchToProps, mapStateToProps } from './index';
import * as Actions from '../../actions';

describe('SignUpForm', () => {
  let wrapper;
  const mockUser = {
    id: 1
  }
  const mockShowSignUp = true;
  const mockLogUserIn = jest.fn();
  const mockSetIsLoading = jest.fn();
  const mockDisplayLogin = jest.fn();
  const mockSubscribe = jest.fn();
  const mockDispatch = jest.fn();
  const mockGetState = jest.fn();
  const mockUserDatabaseFetch = {
    checkUserList: jest.fn().mockImplementation(() => {
      return Promise.resolve({
        data: {
          id: 1,
          name: 'mock name'
        }
      });
    })
  }


  const mockStore = {
    subscribe: mockSubscribe,
    dispatch: mockDispatch,
    getState: mockGetState
  };

  const defaultState = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    signUpError: '',
    userDatabaseFetch: userDatabaseFetch,
    activeErrorText: 'email address already registered'
  };

  const mockPreventDefault = jest.fn();

  const mockEvent = {
    target: {
      name: 'email',
      value: 'email@email.com'
    },
    preventDefault: mockPreventDefault
  }

  beforeEach(() => {
    wrapper = shallow(<SignUpForm 
      store={mockStore}
      user={mockUser}
      showSignUp={mockShowSignUp}
      logUserIn={mockLogUserIn}
      displayLogin={mockDisplayLogin}
      setIsLoading={mockSetIsLoading}
    />);
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have default state', () => {
    expect(wrapper.state()).toEqual(defaultState)
  });

  it('should call displayLogin on click', () => {
    wrapper.find('.skip-sign-up-button').simulate('click', mockEvent);

    expect(mockDisplayLogin).toHaveBeenCalled();
  });

  describe('handleChange', () => {
    it('should call set state', async () => {
      const expected = 'email@email.com'
      await wrapper.instance().handleChange(mockEvent);

      expect(wrapper.state().email).toEqual(expected);
    });

    it.skip('should call handleChange on email input', () => {
      const mockHandleChange = jest.fn().mockImplementation(() => {
      });

      wrapper.instance().handleChange = mockHandleChange;

      wrapper.find('.email-input').simulate('change', mockEvent);

      expect(mockHandleChange).toHaveBeenCalledWith(mockEvent);
    });

    it.skip('should call handleChange on password input', () => {
      const mockHandleChange = jest.fn().mockImplementation(() => {
      });

      wrapper.instance().handleChange = mockHandleChange;

      wrapper.find('.password-input').simulate('change', mockEvent);

      expect(mockHandleChange).toHaveBeenCalledWith(mockEvent);
    });

    it.skip('should call handleChange on confirm password input', () => {
      const mockHandleChange = jest.fn().mockImplementation(() => {
      });

      wrapper.instance().handleChange = mockHandleChange;

      wrapper.find('.password-confirm-input').simulate('change', mockEvent);

      expect(mockHandleChange).toHaveBeenCalledWith(mockEvent);
    });

    it.skip('should call handleChange on name input', () => {
      const mockHandleChange = jest.fn().mockImplementation(() => {
      });

      wrapper.instance().handleChange = mockHandleChange;

      wrapper.find('.name-input').simulate('change', mockEvent);

      expect(mockHandleChange).toHaveBeenCalledWith(mockEvent);
    });
  });

  describe('removeWarning', () => {
    it('should call set state', async () => {
      const expected = '';

      await wrapper.instance().removeWarning();

      expect(wrapper.state().signUpError).toEqual(expected);
    });
  })

  describe('userWarning', () => {
    it('should call set state', async () => {
      const mockErrorText = 'activeErrorText'
      const mockWarning = 'mock warning'
      const mockSignUpError = 'sign-up-error-active'

      await wrapper.instance().userWarning(mockWarning);

     expect(wrapper.state()[mockErrorText]).toEqual(mockWarning);
     expect(wrapper.state().signUpError).toEqual(mockSignUpError);
    });

    // it('should call removeWarning', async () => {
    //   const mockRemoveWarning = jest.fn();

    //   wrapper.instance().removeWarning = mockRemoveWarning;
    //   await wrapper.instance().userWarning()

    //   expect(mockRemoveWarning).toHaveBeenCalled()
    // });
  });
  describe('createNewUser', () => {

    const mockCreateNewUser = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        data: {
          id: 1,
          name: 'mock name'
        }
      });
    });

    const mockUserDataBaseFetch = {
      createNewUser: mockCreateNewUser
    }

    const mockEmail = 'mock email';
    const mockPassword = 'mock password';
    const mockName = 'mock name'

    beforeEach(async () => {
      await wrapper.setState({
        email: mockEmail,
        password: mockPassword,
        name: mockName,
        userDatabaseFetch: mockUserDataBaseFetch
      });
    });

    it('should call preventDefault', async () => {
      await wrapper.instance().createNewUser(mockEvent);

      expect(mockPreventDefault).toHaveBeenCalled();
    });

    it.skip('should call userWarning with the correct params when an error response is returned', async () => {
      const mockErrorResponse = jest.fn().mockImplementation(() => {
        return Promise.resolve({error: 'error'})
      });

      const mockUserWarning = jest.fn()

      wrapper.instance().createNewUser = mockErrorResponse; 
      wrapper.instance().userWarning = mockUserWarning;

      await wrapper.instance().createNewUser(mockEvent);

      expect(mockUserWarning).toHaveBeenCalledWith('signUpError', 'mock name');
    });

    // it('should call userWarning on failed fetch', async () => {
    //   const mockFailedCall = jest.fn().mockImplementation(() => {
    //     return Promise.reject({
    //       error: 'error'
    //     });
    //   });

    //   const mockFailedDatabase = {checkUserList: mockFailedCall}
    //   const mockUserWarning = jest.fn();

    //   await wrapper.setState({
    //     userDatabaseFetch: mockFailedDatabase
    //   });

    //   wrapper.instance().userWarning = mockUserWarning

    //   await wrapper.instance().submitSignUp(mockEvent);

    //   expect(mockUserWarning).toHaveBeenCalled();
    // })

    it.skip('should call createNewUser on submit', () => {
      const mockSubmitSignUp = jest.fn();
      wrapper.instance().createNewUser = mockSubmitSignUp

      wrapper.find('form').simulate('submit');

      expect(mockSubmitSignUp).toHaveBeenCalled();
    })

  });

});