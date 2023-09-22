import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ToastAndroid,
} from "react-native";
import React from "react";
import useCart from "../store/useCart.store";
import { useRouter } from "expo-router";
import ConfirmedCard from "../components/ConfirmedCard";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInDown } from "react-native-reanimated";

const confirmedCart = () => {
  const { confirmedCart, resetConfirmedCart } = useCart();
  const router = useRouter();

  const getTotalAmount = () => {
    return confirmedCart.reduce((prev, newVal) => prev + newVal.price, 0);
  };

  const placeCoffeeHandle = () => {
    ToastAndroid.show("Your Order will be in a minute...", ToastAndroid.CENTER);
    resetConfirmedCart();
    router.back();
  };

  if (confirmedCart.length === 0) {
    return (
      <View style={styles.cartNotFoundContainer}>
        <Text style={styles.cartNotFoundText}>
          You didn’t order anything yet.
        </Text>
        <TouchableOpacity
          onPress={() => {
            if (router.canGoBack()) {
              router.back();
            }
          }}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Ionicons name="arrow-back" size={28} />
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>Order Now</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <Animated.View
      entering={FadeInDown}
      style={{
        flex: 1,
      }}
    >
      <FlatList
        style={{
          flex: 1,
        }}
        data={confirmedCart}
        renderItem={({ item: { name, image, price, qty } }) => {
          return (
            <ConfirmedCard name={name} image={image} price={price} qty={qty} />
          );
        }}
        ListFooterComponent={() => {
          return (
            <Text style={styles.listFooterText}>
              Total: ${getTotalAmount()}
            </Text>
          );
        }}
      />
      <TouchableOpacity style={styles.placeBtn} onPress={placeCoffeeHandle}>
        <Text style={styles.placeBtnText}>Get Order Ready</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default confirmedCart;

const styles = StyleSheet.create({
  cartNotFoundContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cartNotFoundText: {
    fontSize: 18,
    marginBottom: 15,
  },
  listFooterText: {
    fontWeight: "400",
    fontSize: 14,
    textAlign: "right",
    paddingVertical: 10,
    paddingRight: 15,
  },
  placeBtn: {
    padding: 15,
    backgroundColor: "#1f1000",
    margin: 5,
    borderRadius: 5,
  },
  placeBtnText: {
    color: "white",
    textAlign: "center",
  },
});
