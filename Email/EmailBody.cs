namespace Cuttlefish.Email
{
    public static class EmailBody
    {
        public static string EmailStringBody (string email, string emailToken)
        {
            return $@"<html>
                        <div>
                            <h1>Reset Cuttlefish Password</h1>    
                            <p>Click below to reset password</p>
                            <a href=""http://localhost:44430/reset?email={email}&code={emailToken}"" target=""_blank"">Reset Password</a><br></br>
                            <p>Regards<br></br> Cuttlefish Team</p>
                        </div>
                    </html>";
        }
    }
}
