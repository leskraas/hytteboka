import React from 'react';
import {
    Button,
    Card as MaterialCard,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Typography
} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import styled from "styled-components";


interface IProps {
    title: string,
    slug: string,
    image: string
    description: string
}

export const Card = (props: IProps) => {
    const history = useHistory();
    const handleClick = () => {
        history.push({
            pathname: props.slug,
            state: {prevPath: location.pathname}
        });
    }
    return (
        <StyledCard>
            <CardActionArea onClick={handleClick}>
                <CardMedia
                    component="img"
                    height="140"
                    alt=" "
                    src={props.image}
                />
                <CardContent>
                    <Typography gutterBottom variant="h4" component="h2">
                        {props.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.description && props.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" onClick={handleClick}>
                    Les
                </Button>
            </CardActions>
        </StyledCard>
    );
}


const StyledCard = styled(MaterialCard)`
  width: 250px;
`;
