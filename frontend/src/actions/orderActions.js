import axios from 'axios'

import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_REQUEST,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_SUCCESS,
} from '../constants/orderConstants'
import { resetCart } from '../actions/cartActions'

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/orders`, order, config)

    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data })
    dispatch(resetCart())
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.respose && error.respose.data.message
          ? error.message
          : error.response.data.message,
    })
  }
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/orders/${id}`, config)

    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.respose && error.respose.data.message
          ? error.message
          : error.response.data.message,
    })
  }
}

export const payOrder =
  (orderID, paymentResult) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_PAY_REQUEST,
      })

      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.put(
        `/api/orders/${orderID}/pay`,
        paymentResult,
        config
      )

      dispatch({ type: ORDER_PAY_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: ORDER_PAY_FAIL,
        payload:
          error.respose && error.respose.data.message
            ? error.message
            : error.response.data.message,
      })
    }
  }

export const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_MY_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/orders/myorders`, config)

    dispatch({ type: ORDER_LIST_MY_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload:
        error.respose && error.respose.data.message
          ? error.message
          : error.response.data.message,
    })
  }
}