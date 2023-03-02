namespace Cuttlefish.Email
{
    public class EmailBody
    {

        private readonly IConfiguration _config;

        public EmailBody(IConfiguration config)
        {
            _config = config;
        }

        public string EmailStringBody(string email, string emailToken)
        {
            string url = _config["url"];
            return $@"<html>
                        <div>
                            <h1>Reset Cuttlefish Password</h1>    
                            <p>Click below to reset password</p>
                            <a href=""{url}/reset?email={email}&code={emailToken}"" target=""_blank"">Reset Password</a><br></br>
                            <p>Regards<br></br> Cuttlefish Team</p>
                        </div>
                    </html>";
        }
    }
}
