"use client";
import React, { useCallback, useEffect } from "react";
import { useParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { setSelectedUser } from "@/redux/reducers/selectedUser";
import { AppDispatch } from "@/redux/store";
function DeliveryPeople() {
  const { _id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const getUser = useCallback(async () => {
    try {
      await dispatch(setSelectedUser(_id)).unwrap();
    } catch (error) {
      console.error(error);
    }
  }, [_id, dispatch]);

  useEffect(() => {
    getUser();
  }, [getUser]);
  return <div>page</div>;
}

export default DeliveryPeople;
