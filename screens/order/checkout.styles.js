import { StyleSheet } from 'react-native';
import { COLOURS, COLORS } from '../../constants';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOURS.white,
        paddingHorizontal: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerText: {
        color: '#383838',
        fontSize: 20,
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
    },
    empty: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 10,
    },
    emptyText: {
        color: COLORS.grey80,
        fontSize: 16,
    },
    btn: {
        padding: 14,
        backgroundColor: COLORS.primary,
        borderRadius: 4,
        marginTop: 14,
    },
    btnText: {
        color: COLORS.light,
    },
    contain: {
        flex: 1,
        gap: 14,
        marginTop: 16,
    },
    card: {
        flex: 1,
        borderRadius: 4,
        shadowRadius: 4,
        shadowColor: COLORS.shadow08,
        padding: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: COLORS.grey08,
    },
    total: {
        color: COLORS.dark60,
    },
    handle: {
        borderRadius: 4,
        paddingHorizontal: 4,
        color: COLORS.light,
        backgroundColor: COLORS.success80,
    },
    done: {
        borderRadius: 4,
        paddingHorizontal: 4,
        color: COLORS.light,
        backgroundColor: COLORS.primary,
    },
    transport: {
        borderRadius: 4,
        paddingHorizontal: 4,
        color: COLORS.light,
        backgroundColor: COLORS.support1,
    },
    date: {
        color: COLORS.grey80,
    },
});

export default styles;
