import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import { Button, IconButton, Menu, Toolbar, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { Badge } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import ShoppingCartSharpIcon from "@mui/icons-material/ShoppingCartSharp";
import { useDispatch, useSelector } from "react-redux";
import { getItemCount } from "../utils/utils";
import { styled, alpha } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigation } from "react-router-dom";
// const searchTerm = searchParams.get("searchTerm")
import { getAllCategory } from "../features/category-slice";
import { useNavigate, useSearchParams } from "react-router-dom";
import { NoteTwoTone } from "@mui/icons-material";
import { useAuth } from "../firebase/Auth";

const Search = styled("section")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  display: "flex",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
}));

const StyledAutoComplete = styled(Autocomplete)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiTextField-root": {
    paddingRight: `calc(1em + ${theme.spacing(4)})`,
  },
  "& .MuiInputBase-input": {
    color: "white",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
}));

const SearchIconWrapper = styled("section")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  right: 0,
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.common.white,
  textDecoration: "none",
}));

function SearchBar() {
  const theme = useTheme();
  const products = useSelector((state) => state.products.value);
  const categories = useSelector((state) => state.categories?.value);
  const dispatch = useDispatch();
  const [selectedCategory, setselectedCategory] = useState("");
  const [selectedProduct, setselectedProduct] = useState(null);
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const searchTerm = searchParams.get("searchTerm");
  const navigate = useNavigate();
  console.log(selectedCategory);

  useEffect(() => {
    setselectedCategory(category);
  }, [category]);

  if (!categories.length) {
    dispatch(getAllCategory());
  }

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    navigate(
      selectedCategory === "all"
        ? "/home"
        : `/home/?category=${value}${
            searchTerm ? "&searchterm" + searchTerm : ""
          }`
    );
  };
  function handleSearchChange(searchTerm) {
    if (searchTerm) {
      navigate(
        selectedCategory === "all"
          ? `?searchTerm${searchTerm}`
          : `/home/?category=${selectedCategory}&searchTerm=${searchTerm}`
      );
    } else {
      navigate(
        selectedCategory === "all"
          ? `/home`
          : `/home/?category=${selectedCategory}`
      );
    }
  }
  return (
    <>
      <Search>
        <Select
          // value={selectedProduct}
          size="small"
          sx={{
            m: 1,
            textTransform: "capitalize",
            "&": {
              "::before": {
                ":hover": {
                  border: "none",
                },
              },
              "::before, &::after": {
                border: "none",
              },
              ".MuiSelect-standard": {
                color: "common.white",
              },
              ".MuiSelect-icon": {
                fill: theme.palette.common.white,
              },
            },
          }}
          variant="standard"
          labelId="selected-category"
          id="selected-category-id"
          onChange={(e) => handleCategoryChange(e)}
        >
          <MenuItem sx={{ textTransform: "capitalize" }} value="all">
            all
          </MenuItem>
          {categories.map((category) => (
            <MenuItem
              sx={{ textTransform: "capitalize" }}
              key={category}
              value={category}
            >
              {category}
            </MenuItem>
          ))}
        </Select>
        <StyledAutoComplete
          freeSolo
          id="selected-product"
          value={selectedProduct}
          onChange={(e, value) => {
            console.log(value);
            handleSearchChange(value?.label);
          }}
          disablePortal
          options={Array.from(
            selectedCategory === "all"
              ? products
              : products.filter((prod) => prod.category === category),
            (prod) => ({
              id: prod.id,
              label: prod.title,
            })
          )}
          // sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} />}
        />
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
      </Search>
    </>
  );
}

export default function Header() {
  const { user, signUserOut } = useAuth();
  const cartItems = useSelector((state) => state.cart?.cartItems);
  const cartQuantity = getItemCount(cartItems);
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const theme = useTheme();
  const navigate = useNavigate();
  const navigateToCart = () => {
    navigate("/cart");
  };
  function handleProfileMenuOpen(event) {
    setAnchorEl(event.currentTarget);
  }
  function handleMenuClose() {
    setAnchorEl(null);
  }

  const logout = async () => {
    await signUserOut();
    navigate("/login");
  }

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      id="user-profile-menu"
      keepMounted
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My Account</MenuItem>
      <MenuItem onClick={logout}>Log out</MenuItem>
    </Menu>
  );
  return (
    <>
      <AppBar position="sticky" sx={{ py: 1 }}>
        <Toolbar sx={{ flexGrow: 1, gap: 2 }}>
          <Typography variant="h6" color="inherit">
            <StyledLink to="/home">Ecomm</StyledLink>
          </Typography>
          <SearchBar />
          <Box flexBasis={500} sm={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="shows cart item count"
              color="inherit"
              onClick={navigateToCart}
            >
              <Badge
                color="error"
                badgeContent={cartQuantity ? cartQuantity : "0"}
                max={10}
              >
                <ShoppingCartSharpIcon />
              </Badge>
            </IconButton>
            {user ? (
              <Button
                color="inherit"
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
              >
                {" "}
                Hello, {user.displayName ?? user.email}
              </Button>
            ) : (
              <Button color="inherit">Login</Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </>
  );
}
