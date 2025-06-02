import {
  Card,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";

const LoadingCard = () => {
  return (
    <Card.Root
      maxW={{
        base: "xs",
        sm: "sm",
      }}
      overflow="hidden"
    >
      <Skeleton height={"32"}  />
      <Card.Body gap="2">
        <Card.Title>
          <SkeletonText height={"16"} noOfLines={1}/>
        </Card.Title>
        <Card.Footer>
        <SkeletonText noOfLines={5}/>
        </Card.Footer>
      </Card.Body>
    </Card.Root>
  );
};

export default LoadingCard;
