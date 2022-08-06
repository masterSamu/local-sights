import { Container, Table } from "react-bootstrap";

const PrivacyPolicy = () => {
  return (
    <Container className="main-container">
      <h1>Privacy policy</h1>
      <p>
        <i>Last update on privacy policy and effective date is 4.8.2022.</i>
      </p>
      <p>
        At this page we tell how Local Sights is handeling cookies and users
        personal information. By continuing to use our services, you are
        agreeing to the use of cookies and similar technologies for the purposes
        described in this policy.
      </p>

      <h2>Cookies</h2>
      <p>
        Cookies are small files of information that a web server generates and
        send to a web browser. We use cookies to track users in our services, to
        improve user experience and performance.
      </p>

      <h2>Personal data</h2>
      <p>
        Types of personal data we may collect from you when you use our
        services. We are not sharing this data to other parties.
      </p>
      <Table>
        <thead>
          <th>Category</th>
          <th>Personal data</th>
          <th>Reason for collection</th>
        </thead>
        <tbody>
          <tr>
            <td>User account data</td>
            <td>Email address, username and password</td>
            <td>This data is required to create and maintain user account.</td>
          </tr>
          <tr>
            <td>Geolocation</td>
            <td>Coordinates, city, area and country</td>
            <td>
              This data is required when you add a new Sight in our application.
              Data is from the location, where you upload the Sight. Our
              application automatically set city, area and country from
              longitude and latitude coordinates. If you don't add new Sights in
              our application, we don't save your geolocation.
            </td>
          </tr>
        </tbody>
      </Table>

      <h2>Why we collect personal data</h2>
      <p>
        Without personal data, our application would not work as intended. We
        would not be able to follow who is uploading new Sights.
      </p>

      <h2>How we collect your data</h2>
      <p>
        We collect your personla data only when you are adding it to our app.
        Example creating an account or adding new Sight.
      </p>

      <h2>How we store your data</h2>
      <p>
        All data is stored in EU area according to European Union General Data
        Protection Regulation (GDPR) compliance.
      </p>

      <h2>What are your data protection rights?</h2>
      <p>
        You can ask us to delete your account anytime. But after that, you are
        not able to use services that are only for registered users.
      </p>
    </Container>
  );
};

export default PrivacyPolicy;
