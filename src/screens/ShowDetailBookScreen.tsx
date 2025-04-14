import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    StyleSheet,
    ListRenderItemInfo,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type Book = {
    id: string;
    title: string;
    author: string;
    image: any;
    rating: number;
    price: string;
};

const booksDataMonth: Book[] = [/* dữ liệu top tháng như bạn đã có */];
const booksDataWeek: Book[] = [/* dữ liệu top tuần như bạn đã có */];
const booksDataDay: Book[] = [/* dữ liệu top ngày như bạn đã có */];

const ITEMS_PER_PAGE = 5;

const RankingView: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState<'month' | 'week' | 'day'>('month');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [data, setData] = useState<Book[]>(booksDataMonth.slice(0, ITEMS_PER_PAGE));
    const [totalPages, setTotalPages] = useState<number>(Math.ceil(booksDataMonth.length / ITEMS_PER_PAGE));

    const navigation = useNavigation<NavigationProp<any>>();

    useEffect(() => {
        let source: Book[] = [];
        if (selectedTab === 'month') source = booksDataMonth;
        else if (selectedTab === 'week') source = booksDataWeek;
        else source = booksDataDay;

        setTotalPages(Math.ceil(source.length / ITEMS_PER_PAGE));
        setData(source.slice(0, ITEMS_PER_PAGE));
    }, [selectedTab]);

    const handleTabChange = (tab: 'month' | 'week' | 'day') => {
        setSelectedTab(tab);
        setCurrentPage(1);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        const start = (page - 1) * ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE;

        let source: Book[] = [];
        if (selectedTab === 'month') source = booksDataMonth;
        else if (selectedTab === 'week') source = booksDataWeek;
        else source = booksDataDay;

        setData(source.slice(start, end));
    };

    const renderPagination = () => {
        const maxPagesToShow = 3;
        let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
        let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

        if (endPage === totalPages) {
            startPage = Math.max(1, totalPages - maxPagesToShow + 1);
        }

        const pages = [];
        if (currentPage > 1) {
            pages.push(
                <TouchableOpacity key="prev" onPress={() => handlePageChange(currentPage - 1)}>
                    <Text style={styles.footerText}>{'<'}</Text>
                </TouchableOpacity>
            );
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <TouchableOpacity key={i} onPress={() => handlePageChange(i)}>
                    <Text style={[styles.footerText, currentPage === i && { fontWeight: 'bold' }]}>{i}</Text>
                </TouchableOpacity>
            );
        }

        if (endPage < totalPages) {
            pages.push(<Text key="dots" style={styles.footerText}>...</Text>);
        }

        if (currentPage < totalPages) {
            pages.push(
                <TouchableOpacity key="next" onPress={() => handlePageChange(currentPage + 1)}>
                    <Text style={styles.footerText}>{'>'}</Text>
                </TouchableOpacity>
            );
        }

        return pages;
    };

    const handleNavigateHome = () => {
        navigation.navigate('Trang chủ');
    };

    const renderItem = ({ item }: ListRenderItemInfo<Book>) => (
        <View style={styles.itemContainer}>
            <TouchableOpacity onPress={handleNavigateHome}>
                <Image source={item.image} style={styles.image} />
            </TouchableOpacity>
            <View style={styles.itemDetails}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.author}>Tác giả: {item.author}</Text>
                <Text style={styles.rating}>Đánh giá: {item.rating}</Text>
                <Text style={styles.price}>Lượt xem: {item.price}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.breadcrumb}>
                <TouchableOpacity onPress={handleNavigateHome}>
                    <Text style={styles.breadcrumbLink}>Trang chủ</Text>
                </TouchableOpacity>
                <Text style={styles.breadcrumbArrow}> → </Text>
                <Text style={styles.breadcrumbCurrent}>Bảng xếp hạng</Text>
            </View>

            <View style={styles.tabsContainer}>
                {(['month', 'week', 'day'] as const).map((tab) => (
                    <TouchableOpacity key={tab} onPress={() => handleTabChange(tab)} style={styles.tabButton}>
                        <Text style={selectedTab === tab ? styles.activeTab : styles.inactiveTab}>
                            {tab === 'month' ? 'Top tháng' : tab === 'week' ? 'Top tuần' : 'Top ngày'}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                style={styles.flatList}
            />

            <View style={styles.footer}>
                {renderPagination()}
            </View>
        </View>
    );
};

export default RankingView;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
        marginTop: 10,
    },
    breadcrumb: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    breadcrumbLink: {
        fontSize: 15,
        color: '#333',
        fontWeight: '500',
        marginLeft: 10,
    },
    breadcrumbArrow: {
        fontSize: 15,
        marginHorizontal: 5,
        color: '#888',
    },
    breadcrumbCurrent: {
        fontSize: 15,
        color: '#007bff',
        fontWeight: '500',
    },
    tabsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
    },
    tabButton: {
        padding: 10,
    },
    activeTab: {
        color: '#007bff',
        fontWeight: 'bold',
    },
    inactiveTab: {
        color: '#555',
    },
    itemContainer: {
        flexDirection: 'row',
        margin: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 10,
        elevation: 2,
    },
    image: {
        width: 80,
        height: 100,
        borderRadius: 4,
    },
    itemDetails: {
        marginLeft: 10,
        justifyContent: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    author: {
        fontSize: 14,
        color: '#666',
    },
    rating: {
        fontSize: 14,
        color: '#444',
    },
    price: {
        fontSize: 14,
        color: '#222',
    },
    flatList: {
        marginBottom: 20,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 15,
    },
    footerText: {
        marginHorizontal: 8,
        fontSize: 16,
        color: '#007bff',
    },
});
