import React from 'react';
import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer'

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
    },
    section: {
        flexGrow: 1,
    },
});

const Report = ({item}) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text>Name: {item.car.name}</Text>
                <Text>Price: {item.car.price}</Text>
                <Text>Quantity: {item.quantity}</Text>
                <Text>Sum: {item.quantity * item.car.price} Euro</Text>
            </View>
        </Page>
    </Document>
)

export default Report;