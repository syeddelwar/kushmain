import React, { useEffect, useState } from "react";
import Head from "next/head";
// import leftmenu
import LeftMenu from "@/components/Dashboard/LeftMenu";
import { API_URL, API_TOKEN } from "@/config/index";
import DataTable from "react-data-table-component";
import { CSVLink } from "react-csv";
import { TiDeleteOutline } from "react-icons/ti";
import DHeader from "@/components/Dashboard/DHeader";
// import tailwind modal
import {
  Dialog,
  DialogHeader,
  DialogBody,
  Input,
  Chip,
} from "@material-tailwind/react";

// imports react pdf
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

// style sheet for
const styles = StyleSheet.create({
  doc: {
    color: "#404B50",
    fontWeight: "bold",
    textAlign: "center",
  },
  header: {
    color: "#000",
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
    marginVertical: "20px",
  },
  label: {
    fontSize: "12px",
    marginBottom: "6px",
  },
  input: {
    fontSize: "13px",
    color: "#000",
  },
});

function index() {
  // loead init members
  const [members, setMembers] = useState([]);
  // leoad search
  const [search, setSearch] = useState("");
  // set filtered members
  const [filteredMembers, setFilteredMembers] = useState([]);
  //  set single Data
  const [singleData, setSingleData] = useState("");

  // membershiip pdf
  const MembersPdf = () => (
    <Document>
      <Page size={"A4"} style={styles.doc}>
        <Text style={styles.header} fixed>
          {singleData.FirstName && singleData.FirstName}
        </Text>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            height: 50,
            flexWrap: "wrap",
            paddingHorizontal: 20,
            marginTop: "20px",
          }}
        >
          <View>
            <Text style={styles.label} fixed>
              Title
            </Text>
            <Text style={styles.input} fixed>
              {singleData.Title && singleData.Title}
            </Text>
          </View>

          <View>
            <Text style={styles.label} fixed>
              FirstName
            </Text>
            <Text style={styles.input} fixed>
              {singleData.FirstName && singleData.FirstName}
            </Text>
          </View>
          <View>
            <Text style={styles.label} fixed>
              LastName
            </Text>
            <Text style={styles.input} fixed>
              {singleData.LastName && singleData.LastName}
            </Text>
          </View>
          <View>
            <Text style={styles.label} fixed>
              MiddleName
            </Text>
            <Text style={styles.input} fixed>
              {singleData.MiddleName && singleData.MiddleName}
            </Text>
          </View>
          <View>
            <Text style={styles.label} fixed>
              FamilyLastName
            </Text>
            <Text style={styles.input} fixed>
              {singleData.FamilyLastName && singleData.FamilyLastName}
            </Text>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            height: 50,
            flexWrap: "wrap",
            paddingHorizontal: 20,
            marginTop: "20px",
          }}
        >
          <View>
            <Text style={styles.label} fixed>
              FirstName
            </Text>
            <Text style={styles.input} fixed>
              {singleData.FirstName && singleData.FirstName}
            </Text>
          </View>
          <View>
            <Text style={styles.label} fixed>
              FirstName
            </Text>
            <Text style={styles.input} fixed>
              {singleData.FirstName && singleData.FirstName}
            </Text>
          </View>
          <View>
            <Text style={styles.label} fixed>
              FirstName
            </Text>
            <Text style={styles.input} fixed>
              {singleData.FirstName && singleData.FirstName}
            </Text>
          </View>
          <View>
            <Text style={styles.label} fixed>
              FirstName
            </Text>
            <Text style={styles.input} fixed>
              {singleData.FirstName && singleData.FirstName}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );

  // to open tailwind modals
  const [open, setOpen] = useState(false);
  const handleOpen = (data) => {
    setSingleData(data);
    setOpen(!open);
  };

  // csv headers
  const headers = [
    { label: "ID", key: "id" },
    { label: "FirstName", key: "attributes.FirstName" },
    { label: "LastName", key: "attributes.LastName" },
    { label: "Email", key: "attributes.Email" },
    { label: "DateofBirth", key: "attributes.DateofBirth" },
    { label: "Phone", key: "attributes.Phone" },
    { label: "AddressLine1", key: "attributes.AddressLine1" },
    { label: "AddressLine2", key: "attributes.AddressLine2" },
    { label: "City", key: "attributes.City" },
    { label: "State", key: "attributes.State" },
    { label: "PostalCode", key: "attributes.PostalCode" },
    { label: "Country", key: "attributes.Country" },
    { label: "Skills", key: "attributes.Skills" },
    { label: "InterestAreas", key: "attributes.InterestAreas" },
    { label: "CardInfo", key: "attributes.CardInfo" },
    { label: "BillingFirstName", key: "attributes.BillingFirstName" },
    { label: "BillingLastName", key: "attributes.BillingLastName" },
    { label: "BillingAdressline1", key: "attributes.BillingAdressline1" },
    { label: "BillingAdressline2", key: "attributes.BillingAdressline2" },
    { label: "BillingCity", key: "attributes.BillingCity" },
    { label: "BillingState", key: "attributes.BillingState" },
    { label: "BillingPostal", key: "attributes.BillingPostal" },
    { label: "BillingCountry", key: "attributes.BillingCountry" },
  ];

  // Fetch data from an external API or database
  useEffect(() => {
    fetch(`${API_URL}/api/vendors?populate=*`, {
      method: "GET",
      headers: {
        Authorization: API_TOKEN,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setMembers(data?.data);
        setFilteredMembers(data?.data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const result = members?.filter((member) =>
      member.attributes.FirstName.toLowerCase().match(search.toLowerCase())
    );
    setFilteredMembers(result);
  }, [search]);

  // table columns
  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "FirstName",
      selector: (row) => row.attributes.FirstName,
      sortable: true,
    },
    {
      name: "LastName",
      selector: (row) => row.attributes.LastName,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.attributes.Email,
      sortable: true,
    },
    {
      name: "DateofBirth",
      selector: (row) => row.attributes.DateofBirth,
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row) => row.attributes.Phone,
      sortable: true,
    },
    {
      name: "AddressLine1",
      selector: (row) => row.attributes.AddressLine1,
      sortable: true,
    },


    {
      name: "Action",
      cell: (row) => (
        <Chip
          value="View"
          className=" cursor-pointer  lowercase "
          onClick={() => handleOpen(row.attributes)}
        />
      ),
    },
  ];

  const customStyles = {
    rows: {
      style: {
        backgroundColor: "#fff",
        fontSize: "14px",
        color: "#333",
      },
    },
    headRow: {
      style: {
        backgroundColor: "#F9FAFB",
        boxShadow: "none",
        fontSize: "14px",
        fontWeight: "bold",
        color: "#374151",
        textTransform: "uppercase",
      },
    },
  };

  return (
    <>
      <Head>
        <title>Vendors</title>
      </Head>
      <div className="grid  px-10 grid-cols-1 lg:grid-cols-5 gap-5 justify-items-left p-[3rem] ">
        <LeftMenu />
        <DHeader />
        <div className=" lg:col-span-4  mr-10 mt-14">
          <DataTable
            columns={columns}
            data={filteredMembers}
            // selectableRowsHighlight
            // highlightOnHover
            // selectableRows
            fixedHeader
            title="Vendors"
            subHeader
            subHeaderComponent={
              <div className="relative mb-6  shadow-sm">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-[#6B7280] dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="simple-search"
                  className="  bg-[#F9FAFB] border  border-softGray text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            }
            customStyles={customStyles}
            subHeaderAlign="center"
            pagination
            actions={
              <div className="flex justify-between mb-4 items-center space-x-2">
                <CSVLink
                  data={members}
                  headers={headers}
                  filename={"vendors-data.csv"}
                >
                  <Chip
                    value=" Download CSV"
                    className=" cursor-pointer   capitalize shadow-md active:shadow-sm text-base  "
                  />
                </CSVLink>

                <CSVLink
                  data={members}
                  headers={headers}
                  filename={"Members-data.csv"}
                >
                  <Chip
                    color="amber"
                    value=" Download CSV"
                    className=" cursor-pointer   capitalize shadow-md active:shadow-sm text-base  "
                  />
                </CSVLink>

                <Chip
                  color="indigo"
                  value="Pdf"
                  className=" cursor-pointer   capitalize shadow-md active:shadow-sm text-base  "
                />

                <Chip
                  color="purple"
                  value="Share"
                  className=" cursor-pointer   capitalize shadow-md active:shadow-sm text-base  "
                />
              </div>
            }
          />
        </div>

        {/* // tailwind modal  */}

        <Dialog open={open} handler={handleOpen}>
          <DialogHeader className="  flex justify-between">
            {" "}
            <p className="text-[1.3rem]">
              {singleData.FirstName && singleData.FirstName}
            </p>
            <PDFDownloadLink
              document={<MembersPdf />}
              fileName={`${singleData.FirstName}`}
            >
              {({ loading }) =>
                loading ? (
                  "Loading document..."
                ) : (
                  <Chip
                    value="Dwonlod Pdf "
                    className=" cursor-pointer   capitalize shadow-md active:shadow-sm  text-sm  "
                  />
                )
              }
            </PDFDownloadLink>
            <TiDeleteOutline
              className=" text-[1.5rem] cursor-pointer"
              onClick={handleOpen}
            />
          </DialogHeader>
          <DialogBody>
            <div
              className="grid grid-cols-1 max-h-[80vh]   
            overflow-y-auto 
            xl:grid-cols-2
            
            2xl:overflow-visible  gap-5 2xl:grid-cols-3
          "
            >
              <div className="mr-2 lg:mr-0">
                <label htmlFor="FirstName" className="text-black">
                  FirstName
                </label>
                <Input
                  name="FirstName"
                  className="pt-1"
                  label={singleData.FirstName && singleData.FirstName}
                  disabled
                />
              </div>
              <div className="mr-2 lg:mr-0">
                <label htmlFor="FirstName" className="text-black">
                  First Name
                </label>
                <Input
                  name="FirstName"
                  className="pt-1"
                  label={singleData.FirstName && singleData.FirstName}
                  disabled
                />
              </div>
              <div className="mr-2 lg:mr-0">
                <label htmlFor="FirstName" className="text-black">
                  LastName
                </label>
                <Input
                  name="FirstName"
                  className="pt-1"
                  label={singleData.LastName && singleData.LastName}
                  disabled
                />
              </div>

              <div className="mr-2 lg:mr-0">
                <label htmlFor="FirstName" className="text-black">
                  Email
                </label>
                <Input
                  name="FirstName"
                  className="pt-1"
                  label={singleData.Email && singleData.Email}
                  disabled
                />
              </div>

              <div className="mr-2 lg:mr-0">
                <label htmlFor="FirstName" className="text-black">
                  DateofBirth
                </label>
                <Input
                  name="FirstName"
                  className="pt-1"
                  label={singleData.DateofBirth && singleData.DateofBirth}
                  disabled
                />
              </div>
              <div className="mr-2 lg:mr-0">
                <label htmlFor="FirstName" className="text-black">
                  Phone
                </label>
                <Input
                  name="FirstName"
                  className="pt-1"
                  label={singleData.Phone && singleData.Phone}
                  disabled
                />
              </div>
              <div className="mr-2 lg:mr-0">
                <label htmlFor="FirstName" className="text-black">
                  AddressLine1
                </label>
                <Input
                  name="FirstName"
                  className="pt-1"
                  label={singleData.AddressLine1 && singleData.AddressLine1}
                  disabled
                />
              </div>
              <div className="mr-2 lg:mr-0">
                <label htmlFor="FirstName" className="text-black">
                  AddressLine2
                </label>
                <Input
                  name="FirstName"
                  className="pt-1"
                  label={singleData.AddressLine2 && singleData.AddressLine2}
                  disabled
                />
              </div>
              <div className="mr-2 lg:mr-0">
                <label htmlFor="FirstName" className="text-black">
                  City
                </label>
                <Input
                  name="FirstName"
                  className="pt-1"
                  label={singleData.City && singleData.City}
                  disabled
                />
              </div>
              <div className="mr-2 lg:mr-0">
                <label htmlFor="FirstName" className="text-black">
                  State
                </label>
                <Input
                  name="FirstName"
                  className="pt-1"
                  label={singleData.State && singleData.State}
                  disabled
                />
              </div>
              <div className="mr-2 lg:mr-0">
                <label htmlFor="FirstName" className="text-black">
                  PostalCode
                </label>
                <Input
                  name="FirstName"
                  className="pt-1"
                  label={singleData.PostalCode && singleData.PostalCode}
                  disabled
                />
              </div>
              <div className="mr-2 lg:mr-0">
                <label htmlFor="FirstName" className="text-black">
                  Country
                </label>
                <Input
                  name="FirstName"
                  className="pt-1"
                  label={singleData.Country && singleData.Country}
                  disabled
                />
              </div>
              <div className="mr-2 lg:mr-0">
                <label htmlFor="FirstName" className="text-black">
                  Skills
                </label>
                <Input
                  name="FirstName"
                  className="pt-1"
                  label={singleData.Skills && singleData.Skills}
                  disabled
                />
              </div>
              <div className="mr-2 lg:mr-0">
                <label htmlFor="FirstName" className="text-black">
                  InterestAreas
                </label>
                <Input
                  name="FirstName"
                  className="pt-1"
                  label={singleData.InterestAreas && singleData.InterestAreas}
                  disabled
                />
              </div>
              <div className="mr-2 lg:mr-0">
                <label htmlFor="FirstName" className="text-black">
                  BillingPostal
                </label>
                <Input
                  name="FirstName"
                  className="pt-1"
                  label={singleData.BillingPostal && singleData.BillingPostal}
                  disabled
                />
              </div>
              <div className="mr-2 lg:mr-0">
                <label htmlFor="FirstName" className="text-black">
                  BillingCountry
                </label>
                <Input
                  name="FirstName"
                  className="pt-1"
                  label={singleData.BillingCountry && singleData.BillingCountry}
                  disabled
                />
              </div>

              <div className="mr-2 lg:mr-0">
                <label htmlFor="FirstName" className="text-black">
                  RegistrationId
                </label>
                <Input
                  name="FirstName"
                  className="pt-1"
                  label={singleData.RegistrationId && singleData.RegistrationId}
                  disabled
                />
              </div>
            </div>
          </DialogBody>
        </Dialog>
      </div>
    </>
  );
}

export default index;
