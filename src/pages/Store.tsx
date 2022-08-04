import { Row, Col } from "react-bootstrap";
import { StoreItem } from "../components/StoreItem";
import storeItems from "../data/items.json";

export const Store = () => {
  return (
    <>
      <h1>Store</h1>
      <Row xs={1} md={2} lg={3} className="g-3">
        {storeItems.map((storeItem) => (
          <Col key={storeItem.id}>
            <StoreItem
              {...storeItem}
            />
          </Col>
        ))}
      </Row>
    </>
  );
};
