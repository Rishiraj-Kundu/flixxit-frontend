import React, { useEffect, useState } from "react";
import db from "../utils/firebase_config";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { loadStripe } from "@stripe/stripe-js";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase_config";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default React.memo(function PlansScreen() {
  const [products, setProducts] = useState([]);
  const [UUid, setUUid] = useState();
  const [subscription, setSubscription] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    (async () => onAuthStateChanged(firebaseAuth, (currentUser) => {
      if(currentUser) setUUid(currentUser.uid);
      else navigate("/login");
  }))();
  }, [])

  useEffect(() => {
    if(UUid) {
      (async () => {
        const getSub = await getDocs(
          collection(db, "customers", UUid, "subscriptions")
        );
        console.log(getSub);
        const querySub = getSub;
        querySub.docs.forEach((QueryDocumentSnapshot) => {
           setSubscription({
            role: QueryDocumentSnapshot._document.data.value.mapValue.fields.role
              .stringValue,
            current_period_end:
               QueryDocumentSnapshot._document.data.value.mapValue.fields
                .current_period_end.timestampValue,
            current_period_start:
              QueryDocumentSnapshot._document.data.value.mapValue.fields
                .current_period_start.timestampValue,
            });
            });
      })();
    }
  }, [UUid]);


  useEffect(() => {
    (async () => {
      const querySnapshot = getDocs(collection(db, "products"));
      const products = {};
      const QuerySnapshot = await querySnapshot;
      QuerySnapshot.docs.forEach(async (QueryDocumentSnapshot) => {
        products[QueryDocumentSnapshot.id] =
          QueryDocumentSnapshot._document.data.value.mapValue.fields;
        const priceQuerySnapshot = getDocs(
          collection(db, "products", QueryDocumentSnapshot.id, "prices")
        );
        const Queryresponse = await priceQuerySnapshot;
        Queryresponse.docs.forEach((priceQueryDocumentSnapshot) => {
          products[QueryDocumentSnapshot.id].prices = {
            priceId: priceQueryDocumentSnapshot.id,
            priceData:
              priceQueryDocumentSnapshot._document.data.value.mapValue.fields,
          };
        });
        setProducts(Object.entries(products));
      });
    })();
  }, []);

  const loadCheckout = async (priceId) => {
    const docRef = doc(
      collection(db, "customers", UUid, "checkout_sessions")
    );
    await setDoc(docRef, {
      price: priceId,
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    });

    const sub = onSnapshot(docRef, async (snap) => {
      const { error, sessionId } = snap.data();

      if (error) {
        console.error(`An error occured: ${error.message}`);
      }

      if (sessionId) {
        const stripe = await loadStripe(
          "pk_test_51O9ARLSAglUHsBmBqc8LwN8NOLvLMRCQg0jdbtuHXzF75OnmHkWrebBTsjq4GBNWiFh1U1ukZhDHvKMe2tNPidqe00EDVtz2i1"
        );
        stripe.redirectToCheckout({ sessionId });
      }
    });
  };

  return (
    <Container>
    <div className="plansScreen">
      {subscription && (
        <p>
          Renewal Data:
          {new Date(subscription?.current_period_end).toLocaleDateString()}{" "}
        </p>
      )}
      {products?.length &&
        products.map((item, index) => {
          const isCurrentPlan = item[1].role.stringValue === subscription?.role;
          return (
            <div
              key={index}
              className={`${
                isCurrentPlan && "plansScreen_planDisabled"
              } plansScreen_plans`}
            >
              <div className="plansScreen_info">
                <h5>{item[1].name.stringValue}</h5>
                <h6>{item[1].description.stringValue}</h6>
              </div>
              <button
                onClick={() =>
                  !isCurrentPlan && loadCheckout(item[1].prices.priceId)
                }
              >
                {isCurrentPlan ? "Current Package" : "Subscribe"}
              </button>
            </div>
          );
        })}
    </div>
    </Container>
  );
});

const Container = styled.div`
.plansScreen_plans {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  opacity: 0.8;
}

.plansScreen_plans:hover {
  opacity: 1;
}

.plansScreen_plans > button {
  padding: 10px 20px;
  font-size: 1rem;
  color: #fff;
  background-color: #e50941;
  font-weight: 600;
  border: none;
  cursor: pointer;
}

.plansScreen_planDisabled > button {
  background-color: gray !important;
}
`;


//"3NauWO2Vp0SFt6aUl32lEEedgus1"